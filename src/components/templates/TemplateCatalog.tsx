"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { TemplateCard } from "./TemplateCard";
import { Button } from "@/components/ui/Button";
import {
  templates,
  templateCategories,
  regions,
  type TemplateCategory,
  type Region,
} from "@/data/templates";
import { cn } from "@/lib/cn";

/**
 * Interactive catalog. Renders the complete, unfiltered 24-card list on
 * first paint — every card is real markup, not a client-only placeholder —
 * so search engines, no-JS visitors, and the initial paint all see the full
 * catalog immediately. Filtering is a client-side enhancement layered on top.
 *
 * DELIBERATELY NOT `useSearchParams()`. That hook forces Next's static
 * export to defer everything inside its nearest Suspense boundary to
 * client-only rendering — verified against this project's own build output,
 * which put NO cards in the static HTML while this used it, only the
 * Suspense fallback. The fix is `useRouter()` (fine — it's client-side
 * navigation, not a request-time API) plus reading `window.location.search`
 * directly in an effect after mount. `router.replace()` itself does not
 * require this component's own render to depend on the current URL.
 *
 * PRACTICAL EFFECT: someone landing on a plain `/templates` link (the common
 * case) sees the full catalog with zero extra layout work. Someone landing
 * on a shared filtered link (`/templates?category=...`) sees the full
 * catalog for one frame, then the filter applies — a single, justified
 * reflow, not the "nothing, then everything" shift the old version caused
 * on every single visit.
 */
export function TemplateCatalog() {
  const router = useRouter();

  const [category, setCategory] = useState<TemplateCategory | "all">("all");
  const [region, setRegion] = useState<Region | "all">("all");
  const [query, setQuery] = useState("");
  // Gates the URL-sync effect below. Deliberately STATE, not a ref: setting
  // it inside the same effect that also calls setCategory/setRegion/setQuery
  // lets React batch all four updates into one re-render, so the sync effect
  // below only ever runs once every value is already consistent with the
  // URL the user arrived on — never on a stale intermediate render.
  const [readyToSync, setReadyToSync] = useState(false);

  // Runs once, client-only, after the real (unfiltered) markup has already
  // painted. Applies a filter ONLY if the URL the user actually arrived on
  // asked for one.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlCategory = params.get("category") as TemplateCategory | null;
    const urlRegion = params.get("region") as Region | null;
    const urlQuery = params.get("q");
    if (urlCategory) setCategory(urlCategory);
    if (urlRegion) setRegion(urlRegion);
    if (urlQuery) setQuery(urlQuery);
    setReadyToSync(true);
  }, []);

  // Keep the URL in sync without a server round trip or a history entry per
  // keystroke — replace, not push, so filtering doesn't spam the back
  // button. Gated on `readyToSync` so mount doesn't stomp a filtered URL
  // with the pre-hydration default state before the effect above resolves it.
  useEffect(() => {
    if (!readyToSync) return;
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (region !== "all") params.set("region", region);
    if (query.trim()) params.set("q", query.trim());
    const qs = params.toString();
    router.replace(qs ? `/templates?${qs}` : "/templates", { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, region, query, readyToSync]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return templates.filter((t) => {
      if (category !== "all" && t.category !== category) return false;
      if (region !== "all" && !t.regions.includes(region)) return false;
      if (q && !`${t.name} ${t.practiceType} ${t.blurb}`.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [category, region, query]);

  const hasActiveFilters = category !== "all" || region !== "all" || query.trim() !== "";

  function clearFilters() {
    setCategory("all");
    setRegion("all");
    setQuery("");
  }

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-xs">
          <MagnifyingGlass
            weight="bold"
            aria-hidden="true"
            className="text-ink-faint pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by practice or name"
            aria-label="Search templates"
            className="border-rule-strong bg-bg text-ink placeholder:text-ink-muted w-full border py-2.5 pr-3.5 pl-10 text-[15px] focus:outline-2 focus:-outline-offset-1 focus:outline-ink"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={region}
            aria-label="Filter by region"
            onChange={(e) => setRegion(e.target.value as Region | "all")}
            className="border-rule-strong bg-bg text-ink border px-3.5 py-2 text-sm focus:outline-2 focus:-outline-offset-1 focus:outline-ink"
          >
            <option value="all">All regions</option>
            {regions.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>

          {hasActiveFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="text-ink-muted hover:text-ink underline-draw flex items-center gap-1 px-3 py-2 text-sm transition-colors duration-[--t-fast]"
            >
              <X weight="bold" className="h-3.5 w-3.5" />
              Clear filters
            </button>
          ) : null}
        </div>
      </div>

      {/* Category pills. Horizontal scroll on mobile rather than wrapping into
          a tall block, per the "long lists need a different UI component"
          rule — six categories plus "All" wraps awkwardly at 375px otherwise. */}
      <div className="scroll-rail mt-6 flex gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={cn(
            "snap-item ui-label shrink-0 border px-4 py-2.5 text-[11px] whitespace-nowrap transition-colors duration-[--t-fast]",
            category === "all"
              ? "bg-ink border-ink text-bg"
              : "border-rule text-ink-muted hover:text-ink",
          )}
        >
          All templates
        </button>
        {templateCategories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn(
              "snap-item ui-label shrink-0 border px-4 py-2.5 text-[11px] whitespace-nowrap transition-colors duration-[--t-fast]",
              category === c
                ? "bg-ink border-ink text-bg"
                : "border-rule text-ink-muted hover:text-ink",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="text-ink-muted mt-6 text-sm" role="status">
        {filtered.length} {filtered.length === 1 ? "template" : "templates"}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((template) => (
            <TemplateCard key={template.slug} template={template} />
          ))}
        </div>
      ) : (
        <div className="border-rule mt-4 border px-8 py-16 text-center">
          <h2 className="font-display text-xl">No templates match those filters.</h2>
          <p className="text-ink-muted mx-auto mt-3 max-w-[42ch] leading-relaxed">
            Try a different category or region, or clear the filters to see everything.
          </p>
          <Button onClick={clearFilters} className="mt-6">
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
