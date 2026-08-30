import { cn } from "@/lib/cn";
import { paletteStyle, type Section, type TemplateConfig } from "./schema";
import { DemoBar } from "./parts/DemoBar";
import { StickyAction } from "./parts/StickyAction";
import { Nav } from "./sections/Nav";
import { HeroField } from "./sections/HeroField";
import { Assurance } from "./sections/Assurance";
import { ServiceMenu } from "./sections/ServiceMenu";
import { Steps } from "./sections/Steps";
import { People } from "./sections/People";
import { Pricing } from "./sections/Pricing";
import { Reviews } from "./sections/Reviews";
import { Gallery } from "./sections/Gallery";
import { ProjectIndex } from "./sections/ProjectIndex";
import { Feature } from "./sections/Feature";
import { Credits } from "./sections/Credits";
import { Listings } from "./sections/Listings";
import { AudienceSplit } from "./sections/AudienceSplit";
import { Checklist } from "./sections/Checklist";
import { Faq } from "./sections/Faq";
import { Location } from "./sections/Location";
import { Booking } from "./sections/Booking";
import { Footer } from "./sections/Footer";

/**
 * config.sections -> components.
 *
 * The array order is the render order, so moving a band up the page is moving
 * an array element and nothing else. The switch is exhaustive against the
 * discriminated union: adding a section type to the schema without adding it
 * here is a TypeScript error at the `never` case, which is deliberate. The
 * failure this guards against is a section silently vanishing from a client's
 * live site, and a build that stops is a far cheaper way to find that out.
 *
 * THE WRAPPER IS THE THEME. `.tpl` supplies the token defaults, the palette
 * arrives as inline custom properties read straight from the config, and the
 * two data attributes select the archetype's motion curve and the template's
 * density. Everything inside then resolves `bg-tpl-bg`, `text-tpl-ink`,
 * `font-tpl-display` and the rest against those values, at no runtime cost:
 * the utilities compile to `var(--tpl-*)` and the browser does the resolution.
 * That is what makes a palette a piece of data rather than a stylesheet.
 */

function renderSection(
  section: Section,
  config: TemplateConfig,
  key: string,
  blendNav = false,
): React.ReactNode {
  switch (section.type) {
    case "nav":
      return (
        <Nav
          key={key}
          {...section}
          brandName={config.brand.mark ?? config.brand.name}
          blend={blendNav}
        />
      );
    case "heroField":
      return <HeroField key={key} {...section} />;
    case "assurance":
      return <Assurance key={key} {...section} />;
    case "serviceMenu":
      return <ServiceMenu key={key} {...section} />;
    case "steps":
      return <Steps key={key} {...section} />;
    case "people":
      return <People key={key} {...section} />;
    case "pricing":
      return <Pricing key={key} {...section} />;
    case "reviews":
      return <Reviews key={key} {...section} />;
    case "gallery":
      return <Gallery key={key} {...section} />;
    case "projectIndex":
      return <ProjectIndex key={key} {...section} />;
    case "feature":
      return <Feature key={key} {...section} />;
    case "credits":
      return <Credits key={key} {...section} />;
    case "listings":
      return <Listings key={key} {...section} />;
    case "audienceSplit":
      return <AudienceSplit key={key} {...section} />;
    case "checklist":
      return <Checklist key={key} {...section} />;
    case "faq":
      return <Faq key={key} {...section} />;
    case "location":
      return <Location key={key} {...section} />;
    case "booking":
      return (
        <Booking key={key} {...section} endpoint={config.settings.formEndpoint} />
      );
    case "footer":
      return (
        <Footer
          key={key}
          {...section}
          brandName={config.brand.mark ?? config.brand.name}
          tagline={config.brand.tagline}
          address={config.brand.contact.address}
          phone={config.brand.contact.phone}
          email={config.brand.contact.email}
          social={config.brand.social}
        />
      );
    default: {
      // Exhaustiveness check. If this line stops compiling, a section type was
      // added to the schema and not to this switch.
      const unreachable: never = section;
      return unreachable;
    }
  }
}

export function TemplateRenderer({
  config,
  fontClassName,
  demo,
  className,
}: {
  config: TemplateConfig;
  /** The two next/font variables for THIS template. See <slug>/fonts.ts. */
  fontClassName: string;
  /**
   * Present on every preview in the catalog, absent on a real client build.
   * The bar states that the practice is fictional; see DemoBar for why that is
   * what makes a demo with reviews and prices in it honest.
   */
  demo?: { practice: string; templateName: string };
  className?: string;
}) {
  const { sections } = config;

  // The nav, if there is one, is hoisted out of the flow and stuck to the top
  // together with the demo bar. Two independently sticky bars would overlap;
  // one sticky stack cannot.
  const nav = sections.find((section) => section.type === "nav");
  const rest = sections.filter((section) => section.type !== "nav");

  // The nav blends into the opening only when the opening is a field it can
  // blend into. Asked here rather than inside Nav, because the nav has no way
  // to know what band follows it.
  const blendNav = rest[0]?.type === "heroField" && rest[0].tone === "field";

  return (
    <div
      id="top"
      className={cn("tpl", fontClassName, className)}
      style={paletteStyle(config.theme)}
      data-motion={config.theme.motion}
      data-density={config.theme.density}
    >
      {/* FIXED, not sticky, when the opening is a photograph.
          A sticky header occupies its own space in the flow, which pushes the
          hero down and leaves a strip of flat ground above the image. The
          image has to start at the very top of the page for the nav to be ON
          it, so the header comes out of the flow and the hero reserves the
          room with its own top padding (`--tpl-anchor`).

          When the opening is not a photograph there is nothing to sit over, so
          the header stays sticky and keeps its space. */}
      <div className={cn("z-50", blendNav ? "fixed inset-x-0 top-0" : "sticky top-0")}>
        {demo ? <DemoBar {...demo} /> : null}
        {nav ? renderSection(nav, config, "nav", blendNav) : null}
      </div>

      <main id="main">
        {rest
          .filter((section) => section.type !== "footer")
          .map((section, index) => renderSection(section, config, `${section.type}-${index}`))}
      </main>

      {rest
        .filter((section) => section.type === "footer")
        .map((section, index) => renderSection(section, config, `footer-${index}`))}

      {config.settings.stickyAction ? (
        <>
          <StickyAction
            action={config.settings.stickyAction}
            phone={config.brand.contact.phone}
          />
          {/* Clears the fixed bar so the last line of the footer is reachable. */}
          <div aria-hidden="true" className="h-[76px] md:hidden" />
        </>
      ) : null}
    </div>
  );
}
