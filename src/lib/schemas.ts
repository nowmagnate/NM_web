import { z } from "zod";

/**
 * Validation for both lead forms. Shared between the client-side check before
 * a Firestore write and (implicitly) the Firestore security rules, which
 * enforce the same shape server-side so a crafted request can't bypass this.
 */

export const budgetBands = [
  "Under $10,000",
  "$10,000 to $30,000",
  "$30,000 to $75,000",
  "$75,000+",
  "Not sure yet",
] as const;

export const projectTypes = [
  "Web application",
  "Mobile app",
  "SaaS product",
  "AI agent or tool",
  "Ecommerce",
  "2D mobile game",
  "MVP",
  "Something else",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email address"),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  projectType: z.enum(projectTypes, {
    errorMap: () => ({ message: "Select what you're building" }),
  }),
  budget: z.enum(budgetBands, {
    errorMap: () => ({ message: "Select a budget range" }),
  }),
  message: z
    .string()
    .trim()
    .min(20, "Give us a couple of sentences so we can respond usefully")
    .max(2000),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const domainStatuses = [
  { value: "have-domain", label: "I already have a domain" },
  { value: "need-domain", label: "I need to buy one" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const assetReadiness = [
  { value: "ready", label: "Logo and photos are ready" },
  { value: "partial", label: "I have some of it" },
  { value: "need-help", label: "I don't have any of this yet" },
] as const;

export const briefSchema = z.object({
  businessName: z.string().trim().min(2, "Enter your business name").max(160),
  practiceType: z
    .string()
    .trim()
    .min(2, "Tell us what kind of business this is")
    .max(160),
  templateSlug: z.string().trim().max(80).optional().or(z.literal("")),
  currentSite: z.string().trim().max(300).optional().or(z.literal("")),
  domainStatus: z.enum(["have-domain", "need-domain", "not-sure"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  assetsReady: z.enum(["ready", "partial", "need-help"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  targetLaunch: z.string().trim().max(200).optional().or(z.literal("")),
  name: z.string().trim().min(2, "Enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
});

export type BriefFormData = z.infer<typeof briefSchema>;
