"use client";

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import {
  firebaseConfig,
  firebaseConfigured,
  recaptchaSiteKey,
  appCheckConfigured,
} from "@/config/firebase";

/**
 * Lazy singleton, client-only. Nothing here runs at module load or during the
 * static build — `getDb()` is called only from inside a form's submit
 * handler, so a project with no Firebase config still builds and renders
 * fine; it just can't write a lead until the config exists.
 */

let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let appCheckStarted = false;

function getFirebaseApp(): FirebaseApp | null {
  if (!firebaseConfigured) return null;
  if (!app) {
    app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig);
  }

  // App Check attaches itself to the app instance; only needs doing once.
  if (appCheckConfigured && !appCheckStarted) {
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(recaptchaSiteKey!),
      isTokenAutoRefreshEnabled: true,
    });
    appCheckStarted = true;
  }

  return app;
}

export function getDb(): Firestore | null {
  const instance = getFirebaseApp();
  if (!instance) return null;
  if (!db) db = getFirestore(instance);
  return db;
}
