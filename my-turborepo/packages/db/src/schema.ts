import { relations, sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const Post = pgTable("post", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  title: varchar("name", { length: 256 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
    withTimezone: true,
  }).$onUpdateFn(() => sql`now()`),
});

export const CreatePostSchema = createInsertSchema(Post, {
  title: z.string().max(256),
  content: z.string().max(256),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const User = pgTable("user", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    withTimezone: true,
  }),
  image: varchar("image", { length: 255 }),
});

export const Preregistration = pgTable("preregister", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull(),
  registeredAt: timestamp("registered_at", {
    mode: "date",
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  expiresAt: timestamp("expires_at", {
    mode: "date",
    withTimezone: true,
  }).$defaultFn(() => {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    return expires;
  }),
});

export const CreatePreregistrationSchema = createInsertSchema(Preregistration, {
  email: z.string().max(256),
}).omit({
  id: true,
  registeredAt: true,
  expiresAt: true,
});

export const Account = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => User.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 })
      .$type<"email" | "oauth" | "oidc" | "webauthn">()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const AccountRelations = relations(Account, ({ one }) => ({
  user: one(User, { fields: [Account.userId], references: [User.id] }),
}));

export const Session = pgTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
  expires: timestamp("expires", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
});

export const SessionRelations = relations(Session, ({ one }) => ({
  user: one(User, { fields: [Session.userId], references: [User.id] }),
}));

// Event Table
export const Event = pgTable("event", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  startDate: timestamp("start_date", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  endDate: timestamp("end_date", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  appDeadline: timestamp("app_deadline", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  extendedDeadline: timestamp("extended_deadline", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
});

export const Role = pgTable("role", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => Event.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
});

export const UserRole = pgTable(
  "user_role",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => User.id, { onDelete: "cascade" }),
    roleId: uuid("role_id")
      .notNull()
      .references(() => Role.id, { onDelete: "cascade" }),
  },
  (userRole) => ({
    compoundKey: primaryKey({
      columns: [userRole.userId, userRole.roleId],
    }),
  }),
);

export const UserRoleRelations = relations(UserRole, ({ one }) => ({
  user: one(User, { fields: [UserRole.userId], references: [User.id] }),
  role: one(Role, { fields: [UserRole.roleId], references: [Role.id] }),
}));

export const Application = pgTable("application", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
  status: varchar("status", { length: 255 })
    .$type<"pending" | "accepted" | "checkedin" | "rejected" | "waitlisted">()
    .notNull(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => Event.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => new Date()),

  // application inputs
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  email: varchar("email", { length: 50 }).notNull(),
  age: varchar("age", { length: 50 })
    // .$type<"16-" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24+" | "">()
    .notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 25 }).notNull(),
  school: varchar("school", { length: 100 }).notNull(),
  major: varchar("major", { length: 100 }).notNull(),
  classification: varchar("classification", { length: 100 }).notNull(),
  gradYear: integer("grad_year").notNull(),
  gender: varchar("gender", { length: 50 }).notNull(),
  hasTeam: varchar("has_team", { length: 50 })
    // .$type<"Yes" | "No">()
    .notNull(),
  race: varchar("race", { length: 50 }).notNull(),
  hackathonsAttended: varchar("hackathons_attended", { length: 50 }).notNull(),
  experience: varchar("experience", { length: 50 })
    // .$type<"Beginner" | "Intermediate" | "Advanced">()
    .notNull(),
  eventSource: varchar("event_source", { length: 100 }).notNull(),
  shirtSize: varchar("shirt_size", { length: 25 })
    // .$type<"S" | "M" | "L" | "XL" | "XXL">()
    .notNull(),
  address: varchar("address", { length: 100 }).notNull(),
  references: varchar("references", { length: 255 }).notNull(),
  interestOne: varchar("interest_one", { length: 500 }).notNull(),
  interestTwo: varchar("interest_two", { length: 500 }).notNull(),
  interestThree: varchar("interest_three", { length: 500 }).notNull(),
  dietaryRestriction: varchar("dietary_restriction", { length: 255 }),
  extraInfo: varchar("extra_info", { length: 255 }),
  mlhEmailConsent: boolean("mlh_email_consent").notNull().default(false),
  acceptedEmail: boolean("accepted_email").notNull().default(false),
  waitlistEmail: boolean("waitlist_email").notNull().default(false),
  rejectedEmail: boolean("rejected_email").notNull().default(false),
});

export const UserResume = pgTable("user_resume", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
  resumeUrl: text("resume_url").notNull(),
  resumeName: varchar("resume_name", { length: 255 }).notNull(),
});

export const UserRelations = relations(User, ({ many, one }) => ({
  accounts: many(Account),
  userResume: one(UserResume, {
    fields: [User.id],
    references: [UserResume.userId],
  }),
}));

export const UserResumeRelations = relations(UserResume, ({ one }) => ({
  user: one(User, { fields: [UserResume.userId], references: [User.id] }),
}));

const phoneRegex =
  /^([+][0-9]+)?[\s]?([(]?[0-9]{3}[)]?)[-\s]?([0-9]{3})[-\s]?([0-9]{4})$/;

export const CreateApplicationSchema = createInsertSchema(Application, {
  firstName: z
    .string()
    .min(1, "First Name is missing")
    .max(50, "First Name is too long"),
  lastName: z
    .string()
    .min(1, "Last Name is missing")
    .max(50, "Last Name is too long"),
  age: z.string().min(1, "Age is missing").max(3, "Age is too long"),
  country: z
    .string()
    .min(1, "Country is missing")
    .max(50, "Country is too long"),
  email: z
    .string()
    .min(1, "Email is missing")
    .max(50, "Email is too long")
    .email(),
  phoneNumber: z
    .string()
    .min(10, "Phone number is too short")
    .regex(phoneRegex, "Invalid phone number format")
    .max(25, "Phone number is too long"),
  school: z.string().min(1, "School is missing").max(100, "School is too long"),
  major: z.string().min(1, "Major is missing").max(100, "Major is too long"),
  classification: z
    .string()
    .min(1, "Classification is missing")
    .max(100, "Classification is too long"),
  gradYear: z.number(),
  gender: z.string().min(1, "Gender is missing").max(50, "Gender is too long"),
  race: z.string().min(1, "Race is missing").max(50, "Race is too long"),
  hackathonsAttended: z
    .string()
    .min(1, "Hackathons Attended is missing")
    .max(50, "Hackathons Attended is too long"),
  experience: z
    .string()
    .min(1, "Experience is missing")
    .max(50, "Experience is too long"),
  hasTeam: z
    .string()
    .min(1, "Has Team is missing")
    .max(3, "Has Team is too long"),
  eventSource: z
    .string()
    .min(1, "Event Source is missing")
    .max(100, "Event Source is too long"),
  shirtSize: z
    .string()
    .min(1, "Shirt Size is missing")
    .max(3, "Shirt Size is too long"),
  address: z
    .string()
    .min(1, "Address is missing")
    .max(100, "Address is too long"),
  references: z.string().min(1, "References is missing").max(255),
  interestOne: z
    .string()
    .min(1, "Interest One is missing")
    .max(500, "Interest One is too long"),
  interestTwo: z
    .string()
    .min(1, "Interest Two is missing")
    .max(500, "Interest Two is too long"),
  interestThree: z
    .string()
    .min(1, "Interest Three is missing")
    .max(500, "Interest Three is too long"),
  dietaryRestriction: z
    .string()
    .max(255, "Dietary Restriction is too long")
    .optional()
    .nullable(),
  extraInfo: z
    .string()
    .max(255, "Extra Info is too long")
    .optional()
    .nullable(),
  mlhEmailConsent: z.boolean(),
}).omit({
  id: true,
  userId: true,
  eventId: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  acceptedEmail: true,
  waitlistEmail: true,
  rejectedEmail: true,
});

export const CreateUserResumeSchema = createInsertSchema(UserResume, {
  resumeUrl: z.string().url("Invalid URL format"),
  resumeName: z.string().max(255, "Resume name is too long"),
}).omit({
  id: true,
  userId: true,
});

export const EmailLabel = pgTable("email_label", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const EmailList = pgTable("email_list", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  labelId: integer("label_id")
    .notNull()
    .references(() => EmailLabel.id, { onDelete: "cascade" }),
});

export const EmailListRelations = relations(EmailList, ({ one }) => ({
  label: one(EmailLabel, {
    fields: [EmailList.labelId],
    references: [EmailLabel.id],
  }),
}));

export const EmailLabelRelations = relations(EmailLabel, ({ many }) => ({
  emails: many(EmailList),
}));
