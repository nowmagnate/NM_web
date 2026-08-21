#!/usr/bin/env node
/**
 * Runs against the Firestore emulator. Requires Java (the emulator binary is
 * JVM-based) and either `firebase emulators:exec` or a running `firebase
 * emulators:start` on port 8080. Neither was available in the sandbox this
 * project was built in, so this suite is written and ready but has not been
 * executed end-to-end — run it yourself before relying on the rules in
 * production:
 *
 *   npx firebase emulators:exec --only firestore "node scripts/test-firestore-rules.mjs"
 *
 * WHY TWO PASSES
 * The installed `@firebase/rules-unit-testing` version only exposes
 * `authenticatedContext()` / `unauthenticatedContext()` — there is no API to
 * simulate an App Check token, so `request.app` is always null inside these
 * tests. That is tested directly in Pass 1: it confirms the rules fail
 * closed with no App Check, which is the deployed behavior until App Check
 * is actually wired up to a real project.
 *
 * Pass 2 loads a variant of the same rules with only the App Check clause
 * removed, so the field-validation logic — the part that actually decides
 * whether a payload is a legitimate lead — gets full positive and negative
 * coverage. Everything except that one clause is identical to
 * `firestore.rules`.
 */

import { readFileSync } from "node:fs";
import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
} from "@firebase/rules-unit-testing";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const PROJECT_ID = "nm-rules-test";
const realRules = readFileSync("firestore.rules", "utf8");

// Same file, App Check requirement removed, so the shape-validation logic
// can be tested in isolation from a check this harness cannot simulate.
const rulesWithoutAppCheck = realRules.replace(
  /allow create: if request\.app != null\s*\n\s*&& isValidLead/,
  "allow create: if isValidLead",
);

if (rulesWithoutAppCheck === realRules) {
  console.error(
    "Could not strip the App Check clause — firestore.rules wording changed. " +
      "Update the regex in this script to match.",
  );
  process.exit(1);
}

const validContact = {
  kind: "contact",
  name: "Test Visitor",
  email: "test@example.com",
  projectType: "Web application",
  budget: "Under $10,000",
  message: "This is a long enough message to pass the minimum length check.",
  status: "new",
};

const validBrief = {
  kind: "brief",
  businessName: "Bright Smile Dental",
  practiceType: "Dental practice",
  templateSlug: "dental-practice",
  domainStatus: "have-domain",
  assetsReady: "ready",
  name: "Jane Doe",
  email: "jane@example.com",
  status: "new",
};

let failures = 0;

async function check(name, promise, expect) {
  try {
    await promise;
    if (expect === "fail") {
      console.error(`FAIL  ${name} — expected denial, but it succeeded`);
      failures++;
    } else {
      console.log(`ok    ${name}`);
    }
  } catch (err) {
    if (expect === "succeed") {
      console.error(`FAIL  ${name} — expected success, but got: ${err.message}`);
      failures++;
    } else {
      console.log(`ok    ${name}`);
    }
  }
}

async function runPass1() {
  console.log("\n--- Pass 1: real firestore.rules, no App Check simulated ---\n");
  const env = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: { rules: realRules, host: "127.0.0.1", port: 8080 },
  });

  const client = env.unauthenticatedContext().firestore();

  await check(
    "fails closed: valid payload, no App Check token",
    assertFails(addDoc(collection(client, "leads"), withServerFields(validContact))),
    "fail",
  );

  await check(
    "read always denied",
    assertFails(getDocs(collection(client, "leads"))),
    "fail",
  );

  await env.cleanup();
}

async function runPass2() {
  console.log("\n--- Pass 2: App Check clause removed, shape validation only ---\n");
  const env = await initializeTestEnvironment({
    projectId: PROJECT_ID + "-shape",
    firestore: { rules: rulesWithoutAppCheck, host: "127.0.0.1", port: 8080 },
  });

  const client = env.unauthenticatedContext().firestore();

  await check(
    "valid contact lead is accepted",
    assertSucceeds(addDoc(collection(client, "leads"), withServerFields(validContact))),
    "succeed",
  );

  await check(
    "valid brief lead is accepted",
    assertSucceeds(addDoc(collection(client, "leads"), withServerFields(validBrief))),
    "succeed",
  );

  await check(
    "missing required field is rejected",
    assertFails(
      addDoc(
        collection(client, "leads"),
        withServerFields(omit(validContact, "email")),
      ),
    ),
    "fail",
  );

  await check(
    "message shorter than 20 chars is rejected",
    assertFails(
      addDoc(collection(client, "leads"), withServerFields({ ...validContact, message: "hi" })),
    ),
    "fail",
  );

  await check(
    "malformed email is rejected",
    assertFails(
      addDoc(
        collection(client, "leads"),
        withServerFields({ ...validContact, email: "not-an-email" }),
      ),
    ),
    "fail",
  );

  await check(
    "invalid budget enum value is rejected",
    assertFails(
      addDoc(
        collection(client, "leads"),
        withServerFields({ ...validContact, budget: "a billion dollars" }),
      ),
    ),
    "fail",
  );

  await check(
    "spoofed status is rejected",
    assertFails(
      addDoc(
        collection(client, "leads"),
        withServerFields({ ...validContact, status: "read" }),
      ),
    ),
    "fail",
  );

  await check(
    "oversized string field is rejected",
    assertFails(
      addDoc(
        collection(client, "leads"),
        withServerFields({ ...validContact, name: "x".repeat(500) }),
      ),
    ),
    "fail",
  );

  await check(
    "unknown kind value is rejected",
    assertFails(
      addDoc(
        collection(client, "leads"),
        withServerFields({ ...validContact, kind: "spam" }),
      ),
    ),
    "fail",
  );

  // Even with App Check out of the way, mutation after create must still be denied.
  const created = await addDoc(collection(client, "leads"), withServerFields(validContact));
  await check(
    "update after create is still denied",
    assertFails(updateDoc(doc(client, "leads", created.id), { status: "read" })),
    "fail",
  );
  await check(
    "delete is still denied",
    assertFails(deleteDoc(doc(client, "leads", created.id))),
    "fail",
  );
  await check(
    "read is still denied",
    assertFails(getDocs(collection(client, "leads"))),
    "fail",
  );

  await env.cleanup();
}

function omit(obj, key) {
  const copy = { ...obj };
  delete copy[key];
  return copy;
}

// The rules require `submittedAt == request.time`, which only the real
// serverTimestamp() sentinel resolves to — a client-supplied Date or number
// would be rejected as a spoofed timestamp. Every payload needs this added,
// including the "invalid" ones, so each test isolates the ONE thing it's
// actually checking rather than failing for an unrelated missing field.
function withServerFields(data) {
  return { ...data, submittedAt: serverTimestamp() };
}

async function main() {
  await runPass1();
  await runPass2();

  console.log("");
  if (failures > 0) {
    console.error(`${failures} check(s) failed.`);
    process.exit(1);
  }
  console.log("All Firestore rules checks passed.");
}

main().catch((err) => {
  console.error("Test run crashed:", err);
  process.exit(1);
});
