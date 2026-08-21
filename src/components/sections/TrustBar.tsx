import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { publicClients, techStack } from "@/data/clients";

/**
 * The credibility strip directly under the hero, never inside it.
 *
 * No clients are cleared for public naming, so this shows the stack actually
 * used rather than inventing logos. That is an honest substitute: it tells a
 * technical buyer something true and checkable. It swaps automatically the
 * moment `clients.ts` gains an entry with `publicReference: true`.
 *
 * Marks only, no captions. A label under each logo turns a credibility strip
 * into a glossary and tells the reader nothing they do not already know.
 */
export function TrustBar() {
  const hasClients = publicClients.length > 0;

  return (
    <Section tone="soft" spacing="compact">
      <p className="eyebrow">{hasClients ? "Teams we have built for" : "What we build with"}</p>

      <ul className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-6 md:gap-x-14">
        {hasClients
          ? publicClients.map((client) => (
              <li key={client.name}>
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={112}
                  height={28}
                  className="h-6 w-auto opacity-50 grayscale transition-opacity duration-[--t-base] hover:opacity-100"
                />
              </li>
            ))
          : techStack.map((tech) => (
              <li key={tech.slug}>
                <Image
                  src={`https://cdn.simpleicons.org/${tech.slug}/_/000000`}
                  alt={tech.name}
                  width={26}
                  height={26}
                  unoptimized
                  className="h-[22px] w-[22px] opacity-35 transition-opacity duration-[--t-base] hover:opacity-100 md:h-6 md:w-6"
                />
              </li>
            ))}
      </ul>
    </Section>
  );
}
