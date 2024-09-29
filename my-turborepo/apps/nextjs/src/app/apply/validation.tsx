import { z } from "zod";

import { CreateApplicationSchema } from "@vanni/db/schema";

// const phoneRegex = /^([+][0-9]+)?[\s]?([(]?[0-9]{3}[)]?)[-\s]?([0-9]{3})[-\s]?([0-9]{4})$/

export const applicationSchema = CreateApplicationSchema.merge(
  z.object({
    resumeFile: z.instanceof(File).nullish(),
    liabilityWaiver: z
      .boolean()
      .refine((value) => value, "Please accept the liability waiver"),
    gradYear: z.string().min(1, "Please select a graduation year"),
  }),
);

export type ApplicationSchema = z.infer<typeof applicationSchema>;
