import { z } from "zod";
import { zfd } from "zod-form-data";

const phoneRegex = /^([+][0-9]+)?[\s]?([(]?[0-9]{3}[)]?)[-\s]?([0-9]{3})[-\s]?([0-9]{4})$/

export const applicationSchema = zfd.formData({
  firstName: zfd.text(z.string()
    .max(50, "First Name is too long")),
  lastName: zfd.text(z.string()
    .max(50, "Last Name is too long")),
  age: zfd.text(z.enum(["16-", "17", "18", "19", "20", "21", "22", "23", "24+"])),
  country: zfd.text(z.string()
    .max(50, "Country is too long")),
  email: zfd.text(z.string()
    .max(50, "Email is too long")
    .email()),
  phoneNumber: zfd.text(z.string()
    .min(10, "Phone number is too short")
    .regex(phoneRegex, "Invalid phone number format")
    .max(25, "Phone number is too long")),
  school: zfd.text(z.string()
    .max(50, "School is too long")),
  major: zfd.text(z.string()
    .max(100, "Major is too long")),
  classification: zfd.text(z.string()
    .max(50, "Classification is too long")),
  gradYear: zfd.numeric(),
  gender: zfd.text(z.string()
    .max(50, "Gender is too long")),
  race: zfd.text(z.string()
    .max(50, "Race is too long")),
  hackathonsAttended: zfd.text(z.string()
    .max(50, "Hackathons Attended is too long")),
  experience: zfd.text(z.enum(["Beginner", "Intermediate", "Advanced"])),
  hasTeam: zfd.text(z.enum(["No", "Yes"])),
  eventSource: zfd.text(z.string()
    .max(100, "Event Source is too long")),
  shirtSize: zfd.text(z.enum(["S", "M", "L", "XL", "XXL"])),
  // resume: zfd.file(),
  address: zfd.text(z.string()
    .max(100, "Address is too long")),
  references: zfd.text().optional(),
  interestOne: zfd.text(z.string()
    .max(500, "Interest One is too long")),
  interestTwo: zfd.text(z.string()
    .max(500, "Interest Two is too long")),
  interestThree: zfd.text(z.string()
    .max(500, "Interest Three is too long")),
  dietaryRestriction: zfd.text(z.string()
    .max(255, "Dietary Restriction is too long"))
    .optional(),
  extraInfo: zfd.text(z.string()
    .max(255, "Extra Info is too long"))
    .optional(),
  liabilityWaiver: zfd.checkbox(),
});

export type ApplicationSchema = z.infer<typeof applicationSchema>;
