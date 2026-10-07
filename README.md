# NowMagnate Innovations — Website

Next.js 15 (App Router), Tailwind v4, TypeScript. Fully static export, built for
Firebase Hosting's free (Spark) tier. See [`BUILD-PLAN.md`](./BUILD-PLAN.md) for
the full architecture and phase-by-phase build record, and
[`DESIGN.md`](./DESIGN.md) for the current design system (Struck & Assayed),
and [`PRODUCT.md`](./PRODUCT.md) for durable product truth.

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

| Command | Does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Static export to `out/` — this is what actually ships |
| `npm run start` | Serves the last `out/` build locally via `serve` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run audit` | Custom copy/brand audit — see below |
| `npm run format` | Prettier |

### `npm run audit`

`scripts/audit-copy.mjs` checks every file in `src/` for:
- Em-dashes in visible copy (banned site-wide)
- The literal brand name outside `src/config/brand.ts` and
  `src/components/brand/Logo.tsx` — this is what keeps a rename to a one-file
  edit
- Hardcoded hex colors outside `src/app/globals.css` (and `src/config/theme.ts`,
  the one documented exception — see the comment there)
- A leaked Stripe secret key (`sk_...`) anywhere in source or the build output
- Fake-precise marketing numbers ("40+ projects", "98%"), flagged as warnings
  for a human to confirm rather than auto-failed

Run it before every deploy. It's cheap and catches real regressions.

## Environment variables

Copy `.env.example` to `.env.local` and fill in as they become available. All
`NEXT_PUBLIC_*` because this is a static export with no server — nothing here
is a secret by the time it ships, so access control lives in Firestore
security rules and Stripe's own dashboard, not in hiding config.

**Inlined at build time.** Changing an env var means `npm run build` and a
redeploy, not a config change on a running server.

| Var | Effect when unset |
|---|---|
| `NEXT_PUBLIC_PAYMENTS_API_URL` | Template pages show "Request this template" + a brief-request flow instead of checkout |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | No bot check in the checkout form (the payments Worker only requires it when it has a secret) |
| `NEXT_PUBLIC_FIREBASE_*` | Lead forms render and validate fully, but show a "not fully wired up yet" error on submit with a mailto fallback |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | App Check stays uninitialized; Firestore rules reject all writes until this and Firebase project config are both set |
| `NEXT_PUBLIC_FORM_RELAY_ENDPOINT` | No email ping on a new lead; the Firestore document is still the record of truth, checked from the console |
| `NEXT_PUBLIC_FORM_RELAY_ACCESS_KEY` | Web3Forms only. Without it a Web3Forms endpoint rejects the ping (the lead is still saved) |

## Firestore rules

`firestore.rules` is create-only on the `leads` collection: no client ever
reads, updates, or deletes a lead, and every write is checked against the same
field shape the Zod schemas in `src/lib/schemas.ts` enforce client-side.

### Testing the rules

`scripts/test-firestore-rules.mjs` runs the real rules file against the
Firestore emulator. **The Firestore emulator is a JVM binary — this needs
Java installed** (JDK 11+; the Firebase docs recommend a recent LTS).

```bash
npx firebase emulators:exec --only firestore "node scripts/test-firestore-rules.mjs"
```

This was written and its rule-stripping logic verified, but **not run
end-to-end** in the environment this project was built in (no Java
available there). Run it yourself — locally or in CI — before relying on the
rules in production. See the comment at the top of the script for exactly
what each of the two test passes covers and why the suite is split that way
(the installed `@firebase/rules-unit-testing` version has no API to simulate
an App Check token, so App Check itself is tested by confirming the rules
fail closed without one, and the field-validation logic is tested separately
against a variant with only that one clause removed).

## Deploying

This needs your own Firebase account, project, and (for App Check) a
reCAPTCHA key — nothing here was deployed as part of the build, since that
requires credentials and billing decisions only you can make.

### 1. Create the Firebase project (one-time)

1. [console.firebase.google.com](https://console.firebase.google.com) → **Add project**.
2. Stay on the free **Spark** plan — this project is built to work entirely
   within it (see `BUILD-PLAN.md` for what that constrains and why).
3. In the new project: **Build → Firestore Database → Create database**.
   Start in production mode — `firestore.rules` in this repo is the real
   rule set, not the wide-open test-mode default.
4. **Build → App Check → Get started → reCAPTCHA Enterprise** for a Web app, and
   register one if you haven't yet (**Project settings → General → Your
   apps → Add app → Web**). Copy the site key.
5. **Project settings → General → Your apps → SDK setup and configuration**
   for the six `NEXT_PUBLIC_FIREBASE_*` values.

### 2. Configure this project

```bash
cp .env.example .env.local
```

Fill in the six Firebase values and `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` from
step 1. Leave `NEXT_PUBLIC_PAYMENTS_API_URL` empty until the business is
registered with Stripe (see the table above for what that gates).

```bash
npm install -g firebase-tools   # if you don't have it
firebase login
firebase use --add              # pick the project you just created
```

`firebase use --add` writes `.firebaserc`, which is gitignored (it's
per-developer/per-environment, not shared).

### 3. Deploy Firestore rules (do this before hosting, and again any time
`firestore.rules` changes)

```bash
firebase deploy --only firestore:rules
```

### 4. Build and deploy hosting

```bash
npm run audit && npm run typecheck && npm run build
firebase deploy --only hosting
```

Firebase prints the live URL (`<project-id>.web.app`) when this finishes.

### 5. Custom domain + SSL

**Hosting → Add custom domain** in the console, then add the two DNS records
it gives you at your domain registrar. Firebase provisions and renews the
SSL certificate automatically — nothing to configure beyond the DNS records.

### 6. Verify the live lead pipeline

Before calling launch done:

1. Submit `/contact` and `/brief` on the live URL with real-looking data.
2. **Firestore Database → Data → leads** in the console — confirm the
   documents landed with the right shape.
3. Try to read `/leads` from the client console (`firebase.firestore().collection('leads').get()`)
   in a browser dev console on the live site — confirm it's rejected. That's
   `firestore.rules` doing its job; if it succeeds, stop and fix the rules
   before going further.
4. If `NEXT_PUBLIC_FORM_RELAY_ENDPOINT` is set, confirm the notification
   email actually arrives.

### Redeploying after a content or code change

```bash
npm run build
firebase deploy --only hosting
```

Add `firestore:rules` to the `--only` list too if `firestore.rules` changed.

### Turning Stripe on later

1. Register the business with Stripe, create a **Payment Link** for the
   $499 offer in the Stripe dashboard.
2. Set `NEXT_PUBLIC_PAYMENTS_API_URL` in `.env.local` (and wherever else
   the build actually runs — see below).
3. Rebuild and redeploy. See `src/config/payments.ts` for exactly what
   changes on the template pages when this is set.

### If you'd rather build in CI than locally

Whatever CI system you use needs the same `NEXT_PUBLIC_*` variables set as
build-time environment variables (GitHub Actions secrets, etc.), then runs
`npm run build` and `firebase deploy --only hosting` (using a [Firebase CI
token](https://firebase.google.com/docs/cli#cli-ci-systems) or a service
account, not your personal `firebase login` session).
