import { z } from "zod";
import { zfd } from "zod-form-data";

const phoneRegex = new RegExp(
  "/^([+]?[s0-9]+)?(d{3}|[(]?[0-9]+[)])?([-]?[s]?[0-9])+$/",
);

export const applicationSchema = zfd.formData({
  firstName: zfd.text(z.string().min(1, "Missing First Name")),
  lastName: zfd.text(z.string().min(1, "Missing Last Name")),
  email: zfd.text(
    z.string().min(1, "Missing Email").max(256, "Email is too long").email(),
  ),
  age: zfd.numeric(z.number().min(16, "Too young").max(99, "Too old")),
  country: zfd.text(z.string()),
  phoneNumber: zfd.text(z.string().regex(phoneRegex).min(9)),
  school: zfd.text(z.string()),
  major: zfd.text(z.string()),
  classification: zfd.text(
    z.enum(["Highschool", "Freshman", "Sophomore", "Junior", "Senior+"]),
  ),
  gradYear: zfd.numeric(),
  gender: zfd.text(),
  hasTeam: zfd.text(),
  race: zfd.text(),
  hackathonsAttended: zfd.text(),
  experience: zfd.text(),
  eventSource: zfd.text(),
  shirtSize: zfd.text(),
  resume: zfd.file(),
  address: zfd.text(),
  references: zfd.text(),
  joke: zfd.text(),
  dietaryRestriction: zfd.text(),
  extraInfo: zfd.text(),
  liabilityWaiver: zfd.checkbox(),
});

export type ApplicationSchema = z.infer<typeof applicationSchema>;
