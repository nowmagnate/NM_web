import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
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
 * Mobile: one column, the line down the left edge. Desktop: the line runs down
 * the centre and entries alternate sides with uneven gaps, so the projects
 * read as scattered along it rather than ticked off at even intervals. The
 * line carries no dates and no labels.
 *
 * Screens: a file at `public/projects/<id>/screen-<n>.webp` is picked up at
 * build time (this is a server component, and the site is a static export), so
 * real screenshots drop in with no code change. Without one, a wireframe
 * placeholder frame of the same size is drawn.
 */

/** Intrinsic sizes for screenshots, per device. Files should match these ratios. */
const SIZES: Record<DeviceKind, { width: number; height: number }> = {
  phone: { width: 300, height: 600 },
  "phone-landscape": { width: 600, height: 300 },
  desktop: { width: 640, height: 400 },
};

const GAPS = { tight: "md:mt-0", normal: "md:mt-10", loose: "md:mt-20" } as const;

function screenSrc(project: Project, index: number): string | null {
  const rel = `projects/${project.id}/screen-${index + 1}.webp`;
  return existsSync(join(process.cwd(), "public", rel)) ? `/${rel}` : null;
}

export function ProjectsTimeline() {
  return (
    <Section id="projects" spacing="compact" className="pt-0">
      <div className="max-w-[52ch]">
        <h2 className="font-display text-3xl leading-[1.08] md:text-4xl">
          Projects over the years.
        </h2>
        <p className="text-ink-muted mt-4 leading-relaxed">
          The kinds of products we have built over the years, with the names taken off.
        </p>
      </div>

      <ol className="relative mt-14 md:mt-20">
        {/* The line. Left edge on mobile, centre on desktop. */}
        <span
          aria-hidden="true"
          className="bg-rule-strong absolute top-0 bottom-0 left-[7px] w-px md:left-1/2 md:-translate-x-1/2"
        />
        {projects.map((project, i) => (
          <Reveal as="li" key={project.id} className={cn("relative pb-14 md:pb-0")}>
            <Entry project={project} first={i === 0} />
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

function Entry({ project, first }: { project: Project; first: boolean }) {
  const right = project.side === "right";

  return (
    <div
      className={cn(
        "relative pl-10 md:w-1/2 md:pl-0",
        right ? "md:ml-[50%] md:pl-14" : "md:pr-14",
        !first && GAPS[project.gap],
        first && "md:mt-0",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "border-ink bg-bg absolute top-2 left-0 h-[15px] w-[15px] border-2",
          right ? "md:-left-[8px]" : "md:right-[-8px] md:left-auto",
        )}
      />

      <p className="ui-label text-ink-faint text-[10px]">
        {project.platforms.join(" · ")}
      </p>
      <h3 className="font-display mt-2 text-2xl leading-[1.1] md:text-[28px]">
        {project.category}
      </h3>
      <p className="text-ink-muted mt-3 max-w-[56ch] leading-relaxed">
        {project.utility}
      </p>

      <div className="mt-5 flex flex-wrap items-end gap-3">
        {project.screens.map((screen, n) => (
          <Frame key={n} screen={screen} src={screenSrc(project, n)} />
        ))}
      </div>

      <h4 className="ui-label text-ink-faint mt-5 text-[10px]">Features</h4>
      <ul className="text-ink-soft mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[15px] leading-snug">
        {project.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>

      <h4 className="ui-label text-ink-faint mt-5 text-[10px]">Stack</h4>
      <ul className="mt-2 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <li key={s} className="border-rule text-ink-soft border px-2 py-1 text-[13px]">
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ frames */

const FRAME_WIDTH: Record<DeviceKind, string> = {
  phone: "w-[112px] md:w-[96px]",
  "phone-landscape": "w-[200px] md:w-[170px]",
  desktop: "w-[160px] md:w-[185px]",
};

const FRAME_RATIO: Record<DeviceKind, string> = {
  phone: "aspect-[1/2]",
  "phone-landscape": "aspect-[2/1]",
  desktop: "aspect-[8/5]",
};

function Frame({ screen, src }: { screen: ProjectScreen; src: string | null }) {
  const { device } = screen;
  const phone = device !== "desktop";

  return (
    <figure className={cn("shrink-0", FRAME_WIDTH[device])}>
      <div
        className={cn(
          "border-ink-soft bg-bg-mute relative overflow-hidden border-2 shadow-[var(--lift-sm)]",
          phone ? "rounded-[14px]" : "rounded-[3px] border-t-[10px]",
          FRAME_RATIO[device],
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={screen.alt}
            width={SIZES[device].width}
            height={SIZES[device].height}
            unoptimized
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div role="img" aria-label={screen.alt} className="h-full w-full">
            <Wireframe layout={screen.layout} label={screen.label} />
          </div>
        )}
      </div>
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
