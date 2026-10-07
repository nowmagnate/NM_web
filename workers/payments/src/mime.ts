/**
 * Builds a plain RFC 822 message for Cloudflare's `send_email` binding.
 *
 * The binding takes an ENVELOPE recipient (which must be a verified
 * destination address in Email Routing) separately from the message itself,
 * so the visible `To:` header here can be the shared "orders@" address while
 * the mail is actually delivered to the real inbox behind it. That is what
 * lets a Gmail filter match `to:orders@...`.
 */

function b64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let bin = "";
  for (const byte of bytes) bin += String.fromCharCode(byte);
  return btoa(bin);
}

/** Header values must be one line and plain ASCII. */
function header(value: string): string {
  return value.replace(/[\r\n]+/g, " ").replace(/[^\x20-\x7e]/g, "?").trim();
}

export function buildMessage(args: {
  from: string;
  to: string;
  subject: string;
  text: string;
  date: Date;
  messageIdDomain: string;
}): string {
  const id = `<${crypto.randomUUID()}@${header(args.messageIdDomain)}>`;
  const body = b64(args.text).replace(/(.{76})/g, "$1\r\n");
  return [
    `From: ${header(args.from)}`,
    `To: ${header(args.to)}`,
    `Subject: ${header(args.subject)}`,
    `Date: ${args.date.toUTCString()}`,
    `Message-ID: ${id}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    body,
    "",
  ].join("\r\n");
}

export type PaidOrder = {
  paymentId: string;
  orderId: string;
  amount: number;
  currency: string;
  method?: string;
  notes: Record<string, string | undefined>;
  email?: string;
  contact?: string;
};

export function money(amount: number, currency: string): string {
  return `${currency} ${(amount / 100).toFixed(2)}`;
}

export function orderEmail(order: PaidOrder, now: Date): { subject: string; text: string } {
  const n = order.notes;
  const lines = [
    "A payment was received on the website.",
    "",
    `Amount:      ${money(order.amount, order.currency)}`,
    `Product:     ${n.product ?? "-"}`,
    `Template:    ${n.template ?? "-"}`,
    n.code
      ? `Discount:    ${n.code} (list price ${n.list_amount ? money(Number(n.list_amount), order.currency) : "-"})`
      : "Discount:    none",
    "",
    `Buyer:       ${n.buyer_name ?? "-"}`,
    `Email:       ${n.buyer_email ?? order.email ?? "-"}`,
    `Phone:       ${n.buyer_phone ?? order.contact ?? "-"}`,
    "",
    `Payment id:  ${order.paymentId}`,
    `Order id:    ${order.orderId}`,
    `Method:      ${order.method ?? "-"}`,
    `Received:    ${now.toISOString()}`,
    "",
    "Next: deliver the template as agreed. Reply to the buyer at the email above.",
  ];
  const who = n.buyer_name ? ` from ${n.buyer_name}` : "";
  return {
    subject: `New order${who}: ${money(order.amount, order.currency)}`,
    text: lines.join("\n"),
  };
}
