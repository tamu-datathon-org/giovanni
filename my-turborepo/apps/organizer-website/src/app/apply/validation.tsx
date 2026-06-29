import { z } from "zod";

import { CreateApplicationSchema } from "@vanni/db/schema";

// const phoneRegex = /^([+][0-9]+)?[\s]?([(]?[0-9]{3}[)]?)[-\s]?([0-9]{3})[-\s]?([0-9]{4})$/

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
