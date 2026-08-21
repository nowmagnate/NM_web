import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Section } from "@/components/ui/Section";
import { Hallmark } from "@/components/ui/Hallmark";
import { brand, activeSocialLinks, yearsInBusiness, makersMark } from "@/config/brand";
import { footerNav } from "@/config/site";

/**
 * The underside of the sheet. The provenance strip closes the page the same
 * way it opened it, which is the whole argument made twice.
 *
 * Every string derives from brand config or site config, so a rename or a
 * new legal page propagates without editing this file.
 */
export function Footer() {
  const socials = activeSocialLinks();
  const years = yearsInBusiness();
  const hasAddress = brand.address.line1.length > 0;

  return (
    <Section as="footer" tone="soft" spacing="compact" className="border-rule border-t">
      <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-6">
        <div className="col-span-2">
          <Logo size="md" />
          <p className="text-ink-muted mt-5 max-w-[32ch] text-[15px] leading-[1.6]">
            {brand.tagline}
          </p>
          <Hallmark
            size="sm"
            className="mt-7"
            marks={[
              { glyph: makersMark(), label: "Maker's mark" },
              { glyph: String(brand.foundedYear), label: "Date letter" },
              { glyph: "IN", label: "Home office: India", kind: "disc" },
            ]}
          />
        </div>

        {footerNav.map((group) => (
          <nav key={group.heading} aria-label={group.heading}>
            <h2 className="ui-label text-ink text-[11px]">{group.heading}</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ink-muted hover:text-ink text-[14px] transition-colors duration-[--t-fast]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-rule mt-16 flex flex-col gap-5 border-t pt-7 md:flex-row md:items-center md:justify-between">
        <div className="text-ink-muted flex flex-col gap-1 text-[13px]">
          <p>
            &copy; {new Date().getFullYear()} {brand.legalName}. Shipping since{" "}
            {brand.foundedYear}
            {years > 0 ? `, ${years} years.` : "."}
          </p>
          {hasAddress ? (
            <address className="not-italic">
              {[brand.address.city, brand.address.country].filter(Boolean).join(", ")}
            </address>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px]">
          <a
            href={`mailto:${brand.email.sales}`}
            className="text-ink-muted hover:text-ink transition-colors duration-[--t-fast]"
          >
            {brand.email.sales}
          </a>
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-muted hover:text-ink transition-colors duration-[--t-fast]"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
