import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TemplateRenderer } from "@/templates/kit/TemplateRenderer";
import { builtSlugs, getBuiltTemplate } from "@/templates/registry";

/**
 * The shareable preview. `/preview/<slug>/` is a whole template running at its
 * own URL, with no site header, no site footer and none of the studio's
 * chrome: a prospect opens it and sees the thing they would be buying.
 *
 * Only BUILT templates are listed. A slug that is in the catalog but has not
 * been made yet has no route here at all and 404s, which is the same rule that
 * keeps the catalog's "Design concept" chip honest.
 */
export function generateStaticParams() {
  return builtSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const built = getBuiltTemplate(slug);
  if (!built) return {};

  return {
    // Absolute, so the root layout's `%s · <studio>` template does not append
    // the studio's name to a page that is pretending to be somebody else's
    // site. The template name stays in the title because these get opened four
    // at a time in adjacent tabs.
    title: {
      absolute: `${built.config.seo.title} · ${built.demo.templateName} template demo`,
    },
    description: built.config.seo.description,
    /**
     * NOINDEX, deliberately.
     *
     * Every practice in these previews is fictional. A made-up dental practice
     * with a made-up address ranking in local search for a real city is a
     * genuine harm to the real practices there and to whoever searched, and no
     * amount of SEO value on a demo page is worth it. The catalog pages at
     * `/templates/<slug>` are the indexed, honest version of this content.
     *
     * For the same reason there is no LocalBusiness structured data here.
     * It belongs on a real client build, where the business exists.
     */
    robots: { index: false, follow: false },
  };
}

export default async function TemplatePreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const built = getBuiltTemplate(slug);
  if (!built) notFound();

  return (
    <TemplateRenderer
      config={built.config}
      fontClassName={built.fontClassName}
      demo={built.demo}
    />
  );
}
