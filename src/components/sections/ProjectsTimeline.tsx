import { existsSync } from "node:fs";
import { join } from "node:path";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { ScreenZoom } from "./ScreenZoom";
import {
  projects,
  type DeviceKind,
  type Project,
  type ProjectScreen,
  type ScreenLayout,
} from "@/data/projects";

/**
 * Anonymized project timeline for /work.
 *
 * Desktop: one hairline down the centre, entries alternating sides (the first
 * on the right), each with a struck square on the line. Every entry reads in
 * the same order: title and one-line argument, the screens, features, stack.
 *
 * The alternation is done with floats on purpose. Entries stay in document
 * order, need no JavaScript and no measuring, and a float starts as high as
 * the opposite side's last entry allows. A single margin on the second entry
 * pulls the two columns half an entry out of step, which is what keeps them
 * overlapping down the page instead of ticking off one after another.
 *
 * Mobile: the line stays on the left edge and every entry sits to its right.
 *
 * Screens: a file at `public/projects/<id>/screen-<n>.webp` is picked up at
 * build time (this is a server component, and the site is a static export), so
 * real screenshots drop in with no code change. Without one, a wireframe
 * placeholder frame of the same size is drawn. Real screens can be enlarged
 * (see ScreenZoom); placeholders cannot.
 */

/** Intrinsic sizes for screenshots, per device. Files may be 2x these; only the ratio matters. */
const SIZES: Record<DeviceKind, { width: number; height: number }> = {
  phone: { width: 300, height: 600 },
  "phone-landscape": { width: 600, height: 300 },
  desktop: { width: 640, height: 400 },
};

/**
 * Entries that start roughly half an entry below the opposite side's last
 * one. Entry 1 sets the stagger up; the two columns then drift as entry
 * heights differ, so entry 9 pulls them back out of step. Re-check these
 * indices if entries are added or their content changes length.
 */
const STAGGER = new Set([1, 9]);

function screenSrc(project: Project, index: number): string | null {
  const rel = `projects/${project.id}/screen-${index + 1}.webp`;
  return existsSync(join(process.cwd(), "public", rel)) ? `/${rel}` : null;
}

/** `lead` makes this the first thing on the page: top clearance for the header and the h1. */
export function ProjectsTimeline({ lead = false }: { lead?: boolean }) {
  const Heading = lead ? "h1" : "h2";
  return (
    <Section id="projects" spacing="compact" className={lead ? "pt-[20vh] md:pt-[20vh]" : "pt-8 md:pt-12"}>
      <div className="mx-auto text-center">
        <Heading className="spectrum-text font-display mx-auto max-w-[26ch] text-3xl leading-[1.08] text-balance md:text-4xl">
          Projects over the years.
        </Heading>
        <p className="text-ink-muted mx-auto mt-5 max-w-[54ch] leading-relaxed">
          Most of it sits behind an NDA, so there are no client names here. Below is the
          kind of work we have delivered over the years.
        </p>
      </div>

      <ol className="relative mt-14 flow-root md:mt-20">
        <span
          aria-hidden="true"
          className="bg-rule-strong absolute top-2 bottom-2 left-[7px] w-px md:left-1/2 md:-translate-x-1/2"
        />
        {projects.map((project, i) => (
          <Entry key={project.id} project={project} index={i} />
        ))}
      </ol>
    </Section>
  );
}

function Entry({ project, index }: { project: Project; index: number }) {
  // The first project starts on the right; the rest alternate.
  const right = index % 2 === 0;

  return (
    <Reveal
      as="li"
      className={cn(
        "relative pb-14 pl-10 md:w-1/2 md:pb-16",
        // `clear` keeps a float on its own side when the other side's bottom is
        // a few pixels lower: without it the browser drops it into the gap.
        right
          ? "md:clear-right md:float-right md:pl-12"
          : "md:clear-left md:float-left md:pr-12 md:pl-0",
        STAGGER.has(index) && "md:mt-[21rem]",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "border-ink bg-bg absolute top-1.5 left-0 h-[15px] w-[15px] border-2",
          right ? "md:-left-[8px]" : "md:right-[-8px] md:left-auto",
        )}
      />

      <p className="ui-label text-ink-faint flex items-center gap-3 text-[10px]">
        <span className="spectrum-text font-display text-[20px] font-semibold tracking-normal normal-case">
          {String(index + 1).padStart(2, "0")}
        </span>
        {project.platforms.join(" · ")}
      </p>
      <h3 className="font-display mt-2.5 text-[clamp(1.4rem,2vw,1.7rem)] leading-[1.1] font-semibold tracking-[-0.01em]">
        {project.category}
      </h3>
      <p className="text-ink-muted mt-3 max-w-[52ch] text-[15px] leading-[1.65]">
        {project.utility}
      </p>

      <Stage project={project} />

      <h4 className="ui-label text-ink-faint mt-6 text-[10px]">Features</h4>
      <ul className="border-rule mt-3 grid border-t sm:grid-cols-2 sm:gap-x-6">
        {project.features.map((f) => (
          <li
            key={f}
            className="border-rule text-ink-soft border-b py-1.5 text-[13.5px] leading-snug"
          >
            {f}
          </li>
        ))}
      </ul>

      <h4 className="ui-label text-ink-faint mt-6 text-[10px]">Stack</h4>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {project.stack.map((t) => (
          <li key={t} className="border-rule text-ink-muted border px-2 py-1 text-[12px]">
            {t}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ stage */

/**
 * Relative weight of each device when frames share the stage. Frames sit on
 * equal heights by default (weight = aspect ratio); phones are lightened a
 * little so they stand taller than the desktop frames beside them instead of
 * matching them. Below `md` the row scrolls sideways at fixed widths instead.
 */
const WEIGHT: Record<DeviceKind, number> = { phone: 0.62, "phone-landscape": 2, desktop: 1.6 };
const BASE_W: Record<DeviceKind, number> = { phone: 120, "phone-landscape": 240, desktop: 220 };
const RATIO: Record<DeviceKind, string> = {
  phone: "aspect-[1/2]",
  "phone-landscape": "aspect-[2/1]",
  desktop: "aspect-[8/5]",
};

function Stage({ project }: { project: Project }) {
  const onlyPhones = project.screens.every((s) => s.device === "phone");
  return (
    <div className="border-rule bg-bg-soft mt-6 border p-3 sm:p-4">
      <div
        className={cn(
          "-mx-1 flex items-end gap-3 overflow-x-auto px-1 pb-1 md:mx-0 md:gap-3 md:overflow-visible md:px-0",
          onlyPhones && "md:mx-auto md:max-w-[330px]",
        )}
      >
        {project.screens.map((screen, n) => (
          <Frame key={n} screen={screen} src={screenSrc(project, n)} />
        ))}
      </div>
    </div>
  );
}

function Frame({ screen, src }: { screen: ProjectScreen; src: string | null }) {
  const { device } = screen;
  const phone = device !== "desktop";

  return (
    <figure
      className="w-[var(--bw)] shrink-0 md:w-auto md:min-w-0 md:shrink md:[flex:var(--g)_1_0%]"
      style={{ "--bw": `${BASE_W[device]}px`, "--g": WEIGHT[device] } as React.CSSProperties}
    >
      <div
        className={cn(
          "border-ink bg-bg-mute relative overflow-hidden shadow-[var(--lift-sm)]",
          phone ? "rounded-[12px] border-2" : "rounded-[3px] border-[1.5px]",
          RATIO[device],
        )}
      >
        {!phone && (
          <span
            aria-hidden="true"
            className="bg-ink pointer-events-none absolute inset-x-0 top-0 z-10 flex h-[6px] items-center gap-[2px] px-1"
          >
            {[0, 1, 2].map((d) => (
              <i key={d} className="bg-bg/60 block h-[2px] w-[2px] rounded-full" />
            ))}
          </span>
        )}
        {src ? (
          <ScreenZoom
            src={src}
            alt={screen.alt}
            width={SIZES[device].width}
            height={SIZES[device].height}
            className="h-full w-full object-cover"
          />
        ) : (
          <div role="img" aria-label={screen.alt} className="h-full w-full">
            <Wireframe layout={screen.layout} label={screen.label} />
          </div>
        )}
      </div>
      <figcaption className="ui-label text-ink-faint mt-2 text-[8.5px] tracking-[0.14em]">
        {screen.label}
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------- placeholder */

function Bar({ className }: { className?: string }) {
  return <span className={cn("bg-ink-ghost/40 block h-1.5", className)} />;
}

function Wireframe({ layout, label }: { layout: ScreenLayout; label: string }) {
  return (
    <div aria-hidden="true" className="bg-bg flex h-full flex-col gap-1.5 p-2">
      <p className="text-ink-soft truncate text-[9px] leading-none font-semibold">
        {label}
      </p>
      <Layout layout={layout} />
    </div>
  );
}

function Layout({ layout }: { layout: ScreenLayout }) {
  switch (layout) {
    case "dashboard":
      return (
        <div className="flex min-h-0 flex-1 gap-1.5">
          <div className="bg-bg-mute hidden w-1/5 sm:block" />
          <div className="flex flex-1 flex-col gap-1.5">
            <div className="flex flex-1 items-end gap-1">
              {[40, 65, 50, 85, 60, 75].map((h, i) => (
                <span
                  key={i}
                  className="bg-spec-2/60 flex-1"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <Bar className="w-full" />
            <Bar className="w-3/4" />
          </div>
        </div>
      );
    case "chat":
      return (
        <div className="flex flex-1 flex-col justify-end gap-1.5">
          <span className="bg-bg-mute h-3 w-2/3 rounded-sm" />
          <span className="bg-spec-3/50 ml-auto h-3 w-1/2 rounded-sm" />
          <span className="bg-bg-mute h-3 w-3/5 rounded-sm" />
          <span className="bg-spec-3/50 ml-auto h-3 w-2/5 rounded-sm" />
        </div>
      );
    case "board":
      return (
        <div className="grid flex-1 grid-cols-4 content-center gap-1">
          {Array.from({ length: 16 }, (_, i) => (
            <span
              key={i}
              className={cn("aspect-square", i % 5 === 0 ? "bg-spec-2/50" : "bg-bg-mute")}
            />
          ))}
        </div>
      );
    case "retro":
      return (
        <div className="relative flex-1 overflow-hidden">
          <span className="bg-spec-1/40 absolute inset-x-0 top-0 h-1/2" />
          <span className="bg-spec-4/60 absolute right-2 bottom-[34%] h-4 w-4" />
          <span className="bg-ink-soft absolute bottom-0 left-0 h-[34%] w-1/4" />
          <span className="bg-ink-soft absolute bottom-0 left-1/4 h-[24%] w-1/4" />
          <span className="bg-ink-soft absolute bottom-0 left-2/4 h-[40%] w-1/4" />
          <span className="bg-ink-soft absolute bottom-0 left-3/4 h-[28%] w-1/4" />
          <span className="bg-spec-3 absolute bottom-[36%] left-[18%] h-3 w-5" />
        </div>
      );
    case "video":
      return (
        <div className="flex min-h-0 flex-1 gap-1.5">
          <div className="flex flex-1 flex-col gap-1.5">
            <span className="bg-ink-soft/80 flex-1" />
            <div className="flex gap-1">
              <span className="bg-bg-mute h-4 flex-1" />
              <span className="bg-bg-mute h-4 flex-1" />
              <span className="bg-bg-mute h-4 flex-1" />
            </div>
          </div>
          <div className="bg-bg-mute w-1/4" />
        </div>
      );
    case "feed":
    default:
      return (
        <div className="grid flex-1 grid-cols-2 content-start gap-1.5">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="bg-bg-mute aspect-[4/3]" />
              <Bar className="w-3/4" />
            </div>
          ))}
        </div>
      );
  }
}
