import type { TemplateConfig } from "./kit/schema";
import { config as dentalPractice, demoLabel as dentalPracticeDemo } from "./dental-practice/demo";
import { fontClassName as dentalPracticeFonts } from "./dental-practice/fonts";
import { config as familyPractice, demoLabel as familyPracticeDemo } from "./family-practice/demo";
import { fontClassName as familyPracticeFonts } from "./family-practice/fonts";
import { config as pediatricClinic, demoLabel as pediatricClinicDemo } from "./pediatric-clinic/demo";
import { fontClassName as pediatricClinicFonts } from "./pediatric-clinic/fonts";
import { config as physiotherapy, demoLabel as physiotherapyDemo } from "./physiotherapy-chiropractic/demo";
import { fontClassName as physiotherapyFonts } from "./physiotherapy-chiropractic/fonts";
import { config as cleaningServices, demoLabel as cleaningServicesDemo } from "./cleaning-services/demo";
import { fontClassName as cleaningServicesFonts } from "./cleaning-services/fonts";
import { config as yogaStudio, demoLabel as yogaStudioDemo } from "./yoga-pilates-studio/demo";
import { fontClassName as yogaStudioFonts } from "./yoga-pilates-studio/fonts";
import { config as personalTraining, demoLabel as personalTrainingDemo } from "./personal-training/demo";
import { fontClassName as personalTrainingFonts } from "./personal-training/fonts";
import { config as medSpa, demoLabel as medSpaDemo } from "./med-spa-aesthetics/demo";
import { fontClassName as medSpaFonts } from "./med-spa-aesthetics/fonts";
import { config as interiorDesigner, demoLabel as interiorDesignerDemo } from "./interior-designer/demo";
import { fontClassName as interiorDesignerFonts } from "./interior-designer/fonts";
import { config as architectureStudio, demoLabel as architectureStudioDemo } from "./architecture-studio/demo";
import { fontClassName as architectureStudioFonts } from "./architecture-studio/fonts";
import { config as homeStaging, demoLabel as homeStagingDemo } from "./home-staging/demo";
import { fontClassName as homeStagingFonts } from "./home-staging/fonts";
import { config as photographyStudio, demoLabel as photographyStudioDemo } from "./photography-studio/demo";
import { fontClassName as photographyStudioFonts } from "./photography-studio/fonts";
import { config as weddingPlanning, demoLabel as weddingPlanningDemo } from "./wedding-event-planning/demo";
import { fontClassName as weddingPlanningFonts } from "./wedding-event-planning/fonts";
import { config as designConsultancy, demoLabel as designConsultancyDemo } from "./design-consultancy/demo";
import { fontClassName as designConsultancyFonts } from "./design-consultancy/fonts";
import { config as customHomeBuilder, demoLabel as customHomeBuilderDemo } from "./custom-home-builder/demo";
import { fontClassName as customHomeBuilderFonts } from "./custom-home-builder/fonts";
import { config as landscapeDesign, demoLabel as landscapeDesignDemo } from "./landscape-design-build/demo";
import { fontClassName as landscapeDesignFonts } from "./landscape-design-build/fonts";
import { config as remodelingContractor, demoLabel as remodelingContractorDemo } from "./remodeling-contractor/demo";
import { fontClassName as remodelingContractorFonts } from "./remodeling-contractor/fonts";
import { config as lawFirm, demoLabel as lawFirmDemo } from "./law-firm/demo";
import { fontClassName as lawFirmFonts } from "./law-firm/fonts";
import { config as therapyCounseling, demoLabel as therapyCounselingDemo } from "./therapy-counseling/demo";
import { fontClassName as therapyCounselingFonts } from "./therapy-counseling/fonts";
import { config as immigrationAttorney, demoLabel as immigrationAttorneyDemo } from "./immigration-attorney/demo";
import { fontClassName as immigrationAttorneyFonts } from "./immigration-attorney/fonts";
import { config as accountingBookkeeping, demoLabel as accountingBookkeepingDemo } from "./accounting-bookkeeping/demo";
import { fontClassName as accountingBookkeepingFonts } from "./accounting-bookkeeping/fonts";
import { config as financialAdvisory, demoLabel as financialAdvisoryDemo } from "./financial-advisory/demo";
import { fontClassName as financialAdvisoryFonts } from "./financial-advisory/fonts";
import { config as realEstateAgent, demoLabel as realEstateAgentDemo } from "./real-estate-agent/demo";
import { fontClassName as realEstateAgentFonts } from "./real-estate-agent/fonts";
import { config as propertyManagement, demoLabel as propertyManagementDemo } from "./property-management/demo";
import { fontClassName as propertyManagementFonts } from "./property-management/fonts";

/**
 * WHICH TEMPLATES ACTUALLY EXIST.
 *
 * The catalog in `src/data/templates.ts` describes twenty-four; this lists the
 * ones that have been built. Nothing in the UI may offer a live preview for a
 * slug that is not in here, which is the same rule that keeps `previewStatus`
 * honest: the site never claims to show something that has not been made.
 *
 * The imports are static and eager on purpose. This is a static export, so
 * every preview page is rendered at build time and there is nothing to defer;
 * a dynamic import would only trade a build-time cost for a runtime one on a
 * page that has no runtime.
 */

export type BuiltTemplate = {
  /** Matches the `slug` in `src/data/templates.ts`. */
  slug: string;
  config: TemplateConfig;
  /** The two next/font variables for this template. */
  fontClassName: string;
  /** The fictional practice named in the demo bar. */
  demo: { practice: string; templateName: string };
};

export const builtTemplates: BuiltTemplate[] = [
  {
    slug: "dental-practice",
    config: dentalPractice,
    fontClassName: dentalPracticeFonts,
    demo: dentalPracticeDemo,
  },
  {
    slug: "family-practice",
    config: familyPractice,
    fontClassName: familyPracticeFonts,
    demo: familyPracticeDemo,
  },
  {
    slug: "pediatric-clinic",
    config: pediatricClinic,
    fontClassName: pediatricClinicFonts,
    demo: pediatricClinicDemo,
  },
  {
    slug: "physiotherapy-chiropractic",
    config: physiotherapy,
    fontClassName: physiotherapyFonts,
    demo: physiotherapyDemo,
  },
  {
    slug: "yoga-pilates-studio",
    config: yogaStudio,
    fontClassName: yogaStudioFonts,
    demo: yogaStudioDemo,
  },
  {
    slug: "cleaning-services",
    config: cleaningServices,
    fontClassName: cleaningServicesFonts,
    demo: cleaningServicesDemo,
  },
  {
    slug: "personal-training",
    config: personalTraining,
    fontClassName: personalTrainingFonts,
    demo: personalTrainingDemo,
  },
  {
    slug: "med-spa-aesthetics",
    config: medSpa,
    fontClassName: medSpaFonts,
    demo: medSpaDemo,
  },
  {
    slug: "interior-designer",
    config: interiorDesigner,
    fontClassName: interiorDesignerFonts,
    demo: interiorDesignerDemo,
  },
  {
    slug: "architecture-studio",
    config: architectureStudio,
    fontClassName: architectureStudioFonts,
    demo: architectureStudioDemo,
  },
  {
    slug: "home-staging",
    config: homeStaging,
    fontClassName: homeStagingFonts,
    demo: homeStagingDemo,
  },
  {
    slug: "photography-studio",
    config: photographyStudio,
    fontClassName: photographyStudioFonts,
    demo: photographyStudioDemo,
  },
  {
    slug: "wedding-event-planning",
    config: weddingPlanning,
    fontClassName: weddingPlanningFonts,
    demo: weddingPlanningDemo,
  },
  {
    slug: "design-consultancy",
    config: designConsultancy,
    fontClassName: designConsultancyFonts,
    demo: designConsultancyDemo,
  },
  {
    slug: "custom-home-builder",
    config: customHomeBuilder,
    fontClassName: customHomeBuilderFonts,
    demo: customHomeBuilderDemo,
  },
  {
    slug: "landscape-design-build",
    config: landscapeDesign,
    fontClassName: landscapeDesignFonts,
    demo: landscapeDesignDemo,
  },
  {
    slug: "remodeling-contractor",
    config: remodelingContractor,
    fontClassName: remodelingContractorFonts,
    demo: remodelingContractorDemo,
  },
  {
    slug: "law-firm",
    config: lawFirm,
    fontClassName: lawFirmFonts,
    demo: lawFirmDemo,
  },
  {
    slug: "therapy-counseling",
    config: therapyCounseling,
    fontClassName: therapyCounselingFonts,
    demo: therapyCounselingDemo,
  },
  {
    slug: "immigration-attorney",
    config: immigrationAttorney,
    fontClassName: immigrationAttorneyFonts,
    demo: immigrationAttorneyDemo,
  },
  {
    slug: "accounting-bookkeeping",
    config: accountingBookkeeping,
    fontClassName: accountingBookkeepingFonts,
    demo: accountingBookkeepingDemo,
  },
  {
    slug: "financial-advisory",
    config: financialAdvisory,
    fontClassName: financialAdvisoryFonts,
    demo: financialAdvisoryDemo,
  },
  {
    slug: "real-estate-agent",
    config: realEstateAgent,
    fontClassName: realEstateAgentFonts,
    demo: realEstateAgentDemo,
  },
  {
    slug: "property-management",
    config: propertyManagement,
    fontClassName: propertyManagementFonts,
    demo: propertyManagementDemo,
  },
];

export const builtSlugs = builtTemplates.map((template) => template.slug);

export function getBuiltTemplate(slug: string): BuiltTemplate | undefined {
  return builtTemplates.find((template) => template.slug === slug);
}

/** True when `/preview/<slug>/` exists. Used by the catalog to decide what to offer. */
export function hasLivePreview(slug: string): boolean {
  return builtSlugs.includes(slug);
}

export function previewPath(slug: string): string {
  return `/preview/${slug}/`;
}
