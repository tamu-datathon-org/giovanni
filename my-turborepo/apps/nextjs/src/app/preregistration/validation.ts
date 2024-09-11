import { zfd } from "zod-form-data";
import z from "zod"

export const preregistrationSchema = zfd.formData({
    email: zfd.text(z.string().email().max(256).min(1)),
    confirmation: zfd.checkbox(),
})

export type PreregistrationData = z.infer<typeof preregistrationSchema>;