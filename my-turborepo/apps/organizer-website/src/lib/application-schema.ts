import { z } from "zod";

import { CreateApplicationSchema } from "@vanni/db/schema";

/**
 * Client-side validation schema for the organizer walk-in registration form.
 * Extends the shared `CreateApplicationSchema` (from @vanni/db/schema, the
 * same schema the createWalkIn tRPC procedure validates against) with a few
 * fields that only exist for form UX (resume upload, consent checkboxes).
 */
export const applicationSchema = CreateApplicationSchema.merge(
  z.object({
    resume: z.any().optional(),
    resumeFile: z.instanceof(File).nullish().optional(),
    liabilityWaiver: z
      .boolean()
      .refine((value) => value, "Please accept the code of conduct"),
    mlhPrivacyPolicy: z
      .boolean()
      .refine((value) => value, "Please accept the privacy policy"),
    mlhEmailConsent: z.boolean(),
    gradYear: z.string().min(1, "Please select a graduation year"),
    city: z.string().min(1, "City is required").max(100),
    region: z.string().min(1, "State/Region is required").max(100),
    zipCode: z.string().min(1, "Zip code is required").max(20),
  }),
);

export type ApplicationSchema = z.infer<typeof applicationSchema>;
