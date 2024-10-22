import { z } from "zod";

export const FormSchema = z.object({
  mailing_lists: z.array(z.string()),
  subject: z.string(),
  content: z.string(),
  maxBatchSize: z.number().int().min(1).max(10),
  confirmation: z
    .boolean()
    .refine((value) => value, "Please test the email and check the box."),
});
