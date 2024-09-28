import { CreateApplicationSchema } from "@vanni/db/schema";
import { z } from "zod";
import { zfd } from "zod-form-data";

// const phoneRegex = /^([+][0-9]+)?[\s]?([(]?[0-9]{3}[)]?)[-\s]?([0-9]{3})[-\s]?([0-9]{4})$/

export const applicationSchema = zfd.formData(CreateApplicationSchema.merge(z.object({
  resumeFile: z.instanceof(globalThis.FileList).transform((value) => value[0] as File).nullish(),
  liabilityWaiver: zfd.checkbox(),
  gradYear: zfd.numeric(),
})));

export type ApplicationSchema = z.infer<typeof applicationSchema>;
