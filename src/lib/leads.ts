"use client";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getDb } from "./firebaseClient";
import { brand } from "@/config/brand";
import {
  firebaseConfigured,
  formRelayEndpoint,
  formRelayAccessKey,
  formRelayConfigured,
} from "@/config/firebase";

export type LeadKind = "contact" | "brief";

export type LeadResult =
  { ok: true } | { ok: false; reason: "not-configured" | "write-failed" };

/**
 * The body both supported relays understand. Web3Forms wants `access_key`,
 * `subject`, `from_name` and `replyto`; Formspree reads `_subject` and
 * `_replyto`. Each ignores the other's keys, so one payload serves both and
 * the email arrives with a readable subject and a Reply that goes to the
 * enquirer. `accessKey` is injectable so the shape can be tested.
 */
export function relayPayload(
  kind: LeadKind,
  data: Record<string, unknown>,
  accessKey: string | undefined = formRelayAccessKey,
  captchaToken?: string,
) {
  const name = typeof data.name === "string" ? data.name : "";
  const email = typeof data.email === "string" ? data.email : "";
  const subject =
    kind === "brief"
      ? `New template brief${name ? ` from ${name}` : ""}`
      : `New enquiry${name ? ` from ${name}` : ""}`;

  return {
    ...(accessKey ? { access_key: accessKey } : {}),
    subject,
    from_name: name || `${brand.shortName} website`,
    replyto: email,
    _subject: subject,
    _replyto: email,
    // Checked by Web3Forms when hCaptcha is on for the form. Never stored.
    ...(captchaToken ? { "h-captcha-response": captchaToken } : {}),
    kind,
    ...data,
  };
}

/**
 * Best-effort email ping after a successful Firestore write. This must never
 * be able to fail the submission the user is waiting on: Cloud Functions
 * need the paid Blaze plan, so on Spark this is the only notification path,
 * and a flaky third-party relay is not a reason to tell someone their lead
 * did not go through when it did.
 */
async function pingRelay(
  kind: LeadKind,
  data: Record<string, unknown>,
  captchaToken?: string,
) {
  if (!formRelayConfigured || !formRelayEndpoint) return;
  try {
    await fetch(formRelayEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(relayPayload(kind, data, formRelayAccessKey, captchaToken)),
      keepalive: true,
    });
  } catch {
    // Swallowed deliberately. The Firestore document is the record of truth.
  }
}

/**
 * Writes a lead to the single `leads` Firestore collection, tagged by kind
 * rather than split across two collections, so the security rules and any
 * future export/reporting only need to reason about one schema.
 */
export async function submitLead(
  kind: LeadKind,
  data: Record<string, unknown>,
  captchaToken?: string,
): Promise<LeadResult> {
  if (!firebaseConfigured) return { ok: false, reason: "not-configured" };

  const db = getDb();
  if (!db) return { ok: false, reason: "not-configured" };

  try {
    await addDoc(collection(db, "leads"), {
      kind,
      ...data,
      submittedAt: serverTimestamp(),
      // Denormalized for a quick glance in the console without opening each doc.
      status: "new",
    });
  } catch {
    return { ok: false, reason: "write-failed" };
  }

  void pingRelay(kind, data, captchaToken);
  return { ok: true };
}
