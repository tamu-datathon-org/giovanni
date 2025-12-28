import { z } from "zod";

export const FormSchema = z.object({
  mailing_lists: z.array(z.string()),
  subject: z.string(),
  content: z.string(),
  maxBatchSize: z.coerce.number().int().min(1).max(10),
  additionalEmails: z.string().transform((value) => {
    return value.split(",").map((email) => email.trim());
  }),
  confirmation: z
    .boolean()
    .refine((value) => value, "Please test the email and check the box."),
});
