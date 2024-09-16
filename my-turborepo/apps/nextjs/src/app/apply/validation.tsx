import { z } from "zod";
import { zfd } from "zod-form-data";

const phoneRegex = new RegExp(
  '/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/'
);

export const applicationSchema = zfd.formData({
  firstName: zfd.text(z.string().min(1, "Missing First Name")),
  lastName: zfd.text(z.string().min(1, "Missing Last Name")),
  email: zfd.text(z.string().min(1, "Missing Email").max(256, "Email is too long").email()),
  age: zfd.text(z.enum(["16-", "17", "18", "19", "20", "21", "22", "23", "24+"])),
  country: zfd.text(z.string().min(1, "Missing Country")),
  phoneNumber: zfd.text(z.string().regex(phoneRegex).min(9)),
  school: zfd.text(z.string().min(1, "Missing School")),
  major: zfd.text(z.string().min(1, "Missing Major")),
  classification: zfd.text(z.enum(['Highschool', 'Freshman', 'Sophomore', 'Junior', 'Senior+'])),
  gradYear: zfd.numeric(),
  gender: zfd.text(z.string().min(1, "Missing Gender")),
  hasTeam: zfd.text(z.string().min(1, "Missing Team Information")),
  race: zfd.text(z.string().min(1, "Missing Race")),
  hackathonsAttended: zfd.text(z.string().min(1, "Missing Hackathons Attended")),
  experience: zfd.text(z.enum(["Beginner", "Intermediate", "Advanced"])),
  eventSource: zfd.text(z.string().min(1, "Missing Event Source")),
  shirtSize: zfd.text(z.enum(["S", "M", "L", "XL", "XXL"])),
  resume: zfd.file(),
  address: zfd.text(z.string().min(1, "Missing Address")),
  references: zfd.text().optional(),
  interest_one: zfd.text(z.string().min(1, "Missing Interest One")),
  interest_two: zfd.text(z.string().min(1, "Missing Interest Two")),
  interest_three: zfd.text(z.string().min(1, "Missing Interest Three")),
  dietaryRestriction: zfd.text().optional(),
  extraInfo: zfd.text().optional(),
  liabilityWaiver: zfd.checkbox(),
});

export type ApplicationSchema = z.infer<typeof applicationSchema>;
