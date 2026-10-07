import { handle } from "./app.ts";
import type { Env } from "./types.ts";

/**
 * Worker entry. The logic is in app.ts so it can be tested in plain Node; this
 * file only wires in the Cloudflare-specific pieces.
 */
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return handle(request, env, {
      fetch: (input, init) => fetch(input, init),
      now: () => new Date(),
      async sendMail(from, envelopeTo, raw) {
        // Only exists inside the Workers runtime, so it is imported lazily.
        const { EmailMessage } = await import("cloudflare:email");
        const binding = env.SEND_EMAIL as { send(message: unknown): Promise<void> };
        await binding.send(new EmailMessage(from, envelopeTo, raw));
      },
    });
  },
};
