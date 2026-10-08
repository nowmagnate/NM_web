# Payments Worker

A small Cloudflare Worker that does the parts of a Razorpay payment that need a
secret, so the website (a static export on Firebase's free plan) never holds
one. Free Cloudflare plan, no paid Firebase plan.

```
browser (nowmagnate.com)
   |  POST /quote   what would this cost? (optional discount code)
   |  POST /orders  create a Razorpay order, priced HERE from products.ts
   v
Razorpay Checkout opens in the browser with name "NowMagnate Innovations"
   |  POST /verify  check the signature, confirm amount with Razorpay
   v
Razorpay --> POST /webhook  (the reliable confirmation) --> email to the owner
```

The amount is never taken from the browser. The browser names a product and a
template; the Worker looks the price up in `src/products.ts`.

## Where things live

| File | What it is |
| --- | --- |
| `src/products.ts` | **The price list** and the list of orderable templates |
| `src/pricing.ts` | Discount codes and how a final price is worked out |
| `src/app.ts` | The four endpoints (`/quote`, `/orders`, `/verify`, `/webhook`) |
| `src/razorpay.ts` | Razorpay API calls |
| `src/index.ts` | Worker entry (the only file that touches Cloudflare-only APIs) |
| `test/` | Tests, run with plain Node |
| `wrangler.toml` | Cloudflare config |

`npm run check:payments` (run by `npm run verify` in the site) fails if the
price or the template list here drifts from the website.

## First deploy (test mode)

You need Node 20 or newer, and a Cloudflare account that has the
`nowmagnate.com` zone with Email Routing on.

```bash
cd workers/payments
npm install
npx wrangler login
```

1. **Create the KV namespace** (holds discount codes and counters). This also
   writes its id into `wrangler.toml`:

   ```bash
   npx wrangler kv namespace create STORE --binding STORE --update-config
   ```

2. **Check `wrangler.toml`.** `OWNER_INBOX` must be a verified destination
   address in Cloudflare Email Routing (it is `nowmagnate@gmail.com`).
   `ORDERS_ADDRESS` is what shows in the To header. `FROM_ADDRESS` must be on
   the domain that has Email Routing.

3. **Set the secrets.** Each command asks for the value and stores it in
   Cloudflare; nothing goes in a file. Use Razorpay **test** keys first
   (Razorpay dashboard in Test Mode, Settings, API Keys).

   ```bash
   npx wrangler secret put RAZORPAY_KEY_ID
   npx wrangler secret put RAZORPAY_KEY_SECRET
   npx wrangler secret put RAZORPAY_WEBHOOK_SECRET
   ```

   For the webhook secret, make up a long random string and use the same one in
   step 5:

   ```bash
   node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"
   ```

4. **Deploy.** Wrangler also creates the `pay.nowmagnate.com` DNS record.

   ```bash
   npx wrangler deploy
   curl https://pay.nowmagnate.com/health      # {"ok":true}
   ```

5. **Create the Razorpay webhook** (Test Mode, Settings, Webhooks, Add):
   - URL: `https://pay.nowmagnate.com/webhook`
   - Secret: the `RAZORPAY_WEBHOOK_SECRET` from step 3
   - Events: `payment.captured` and `order.paid`

6. **Point the site at it.** Set the GitHub Actions variable
   `NEXT_PUBLIC_PAYMENTS_API_URL` to `https://pay.nowmagnate.com`, then
   redeploy the site (it is baked in at build time). Until it is set, the
   template pages keep showing "Request this template".

7. **Try it** with one of Razorpay's test cards (their docs list them). The
   payment window should say "NowMagnate Innovations", you should land on the
   thank-you page, and an email should arrive for `orders@nowmagnate.com`.

## Going live

Once Razorpay has enabled international payments: switch Razorpay to Live
Mode, create **live** API keys and a **live** webhook (same URL), then re-run
the three `wrangler secret put` commands with the live values and
`npx wrangler deploy`. Make one small real payment and refund it before
announcing.

## Discount codes and flash sales

Codes live in KV and can be added, changed or removed at any time. No deploy.
A code is a JSON record under the key `code:<UPPERCASE CODE>`. Amounts are in
cents. Exactly one of `percentOff`, `amountOff`, `finalAmount`.

```bash
# 20% off
npx wrangler kv key put --binding STORE --remote "code:FLASH20" '{"percentOff":20,"label":"Flash sale"}'

# $100 off, valid for a window, first 50 buyers only
npx wrangler kv key put --binding STORE --remote "code:LAUNCH100" '{"amountOff":10000,"startsAt":"2026-11-01T00:00:00Z","expiresAt":"2026-11-08T00:00:00Z","maxRedemptions":50,"label":"Launch offer"}'

# a fixed price of $299 for one customer
npx wrangler kv key put --binding STORE --remote "code:ACME" '{"finalAmount":29900}'

# look at / remove one
npx wrangler kv key get --binding STORE --remote "code:FLASH20"
npx wrangler kv key delete --binding STORE --remote "code:FLASH20"
```

Optional fields: `startsAt`, `expiresAt` (ISO times), `maxRedemptions` (counted
when a payment lands), `products` (limit to these product ids), `label`.

Give a customer either the code, or a link that applies it:
`https://nowmagnate.com/templates/<template>/?code=FLASH20`. The button then
shows the discounted price. The price is always worked out again on the server
when the order is created, so a code that is wrong, expired or used up is simply
refused.

The price never goes below `minAmount` in `products.ts`.

## Changing the price

Edit `amount` (cents) in `src/products.ts` and the matching `templatePrice` in
`src/config/brand.ts` on the website, then `npx wrangler deploy` and redeploy
the site. `npm run verify` fails until the two agree. Adding another product is
adding another entry in `PRODUCTS`.

## Optional: Turnstile bot check

Create a free Turnstile widget in the Cloudflare dashboard (allow
`nowmagnate.com`). Put the **secret** in the Worker, the **site key** in GitHub:

```bash
npx wrangler secret put TURNSTILE_SECRET
```

and set the variable `NEXT_PUBLIC_TURNSTILE_SITE_KEY`. Without the secret the
Worker does not ask for the check. Also consider one Cloudflare rate-limiting
rule (Security, WAF) for `pay.nowmagnate.com/orders`.

## Security notes

- The Razorpay key secret and webhook secret exist only as Worker secrets.
- Browser endpoints answer only the origins in `ALLOWED_ORIGINS`.
- `/verify` checks the signature and then re-reads the payment and order from
  Razorpay; the webhook signature is checked against the raw body.
- Each payment emails once (`paid:<payment id>` in KV); if the email fails the
  webhook returns an error so Razorpay retries.
- No personal data is written to logs.

## Tests

```bash
npm test          # 29 tests, plain Node, no Cloudflare runtime needed
npm run typecheck
```

`wrangler dev` (the local Cloudflare runtime) does not run on Windows ARM64, so
the Worker's integration test is the test-mode payment above.
