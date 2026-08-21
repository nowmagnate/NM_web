"use client";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getDb } from "./firebaseClient";
import {
  firebaseConfigured,
  formRelayEndpoint,
  formRelayConfigured,
} from "@/config/firebase";

export type LeadKind = "contact" | "brief";

export type LeadResult =
  { ok: true } | { ok: false; reason: "not-configured" | "write-failed" };

/**
 * Best-effort email ping after a successful Firestore write. This must never
 * be able to fail the submission the user is waiting on: Cloud Functions
 * need the paid Blaze plan, so on Spark this is the only notification path,
 * and a flaky third-party relay is not a reason to tell someone their lead
 * did not go through when it did.
 */
async function pingRelay(kind: LeadKind, data: Record<string, unknown>) {
  if (!formRelayConfigured || !formRelayEndpoint) return;
  try {
    await fetch(formRelayEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, ...data }),
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

  void pingRelay(kind, data);
  return { ok: true };
}
