import { z } from "zod";
import { zfd } from "zod-form-data";

export const applicationSchema = zfd.formData({
  firstName: zfd.text(z.string().min(2, "Too short").max(20, "Too long")),
  lastName: zfd.text(
    z.string().min(2, "Too short").max(20, "Too long").optional(),
  ),
  age: zfd.numeric(z.number().min(16, "Too young").max(99, "Too old")),
});

export type ApplicationSchema = z.infer<typeof applicationSchema>;
