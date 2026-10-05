/**
 * Firebase project config, read from env. All `NEXT_PUBLIC_*` because this is
 * a static export with no server: these values are safe to ship in the
 * client bundle by design, and access control is enforced by Firestore
 * security rules, not by hiding the config.
 *
 * `firebaseConfigured` lets the rest of the app degrade gracefully before a
 * real project exists, the same pattern used for Stripe in `payments.ts`:
 * the form still renders and can be filled out, it just cannot submit yet,
 * and it says so rather than throwing.
 */
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
} as const;

export const firebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId,
);

/**
 * reCAPTCHA v3 site key for Firebase App Check. Free tier. Without it, App
 * Check stays uninitialized — fine for local development against the
 * emulator, but the deployed Firestore rules require a valid App Check token,
 * so production writes need this set.
 */
export const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
export const appCheckConfigured = Boolean(recaptchaSiteKey);

/**
 * Optional email ping after a successful Firestore write. Cloud Functions
 * need the paid Blaze plan, so this points at a free form-relay (Web3Forms,
 * Formspree) instead. Left unset, leads land in Firestore only, checked from
 * the console. A relay failure must never fail the underlying submission —
 * enforced in `src/lib/leads.ts`, not here.
 */
export const formRelayEndpoint = process.env.NEXT_PUBLIC_FORM_RELAY_ENDPOINT;
/**
 * Web3Forms identifies the form by a public access key sent in the request
 * body (it is safe to expose, and is restricted to the receiving address and
 * allowed domains in the Web3Forms dashboard). Formspree identifies the form
 * by the endpoint URL itself, so leave this empty when using Formspree.
 */
export const formRelayAccessKey = process.env.NEXT_PUBLIC_FORM_RELAY_ACCESS_KEY;

export const formRelayConfigured = Boolean(formRelayEndpoint);
