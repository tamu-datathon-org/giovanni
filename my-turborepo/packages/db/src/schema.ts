import { relations, sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  primaryKey,
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
})

export const UserRelations = relations(User, ({ many }) => ({
  accounts: many(Account),
}));

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
  startDate: timestamp("start_date", { mode: "date", withTimezone: true }).notNull(),
  endDate: timestamp("end_date", { mode: "date", withTimezone: true }).notNull(),
  appDeadline: timestamp("app_deadline", { mode: "date", withTimezone: true }).notNull(),
  extendedDeadline: timestamp("extended_deadline", { mode: "date", withTimezone: true }).notNull(),
})

export const Role = pgTable("role", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => Event.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
});

export const UserRole = pgTable("user_role", {
  userId: uuid("user_id")
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
  roleId: uuid("role_id")
    .notNull()
    .references(() => Role.id, { onDelete: "cascade" }),
}, (userRole) => ({
  compoundKey: primaryKey({
    columns: [userRole.userId, userRole.roleId],
  }),
}));

export const UserRoleRelations = relations(UserRole, ({ one }) => ({
  user: one(User, { fields: [UserRole.userId], references: [User.id] }),
  role: one(Role, { fields: [UserRole.roleId], references: [Role.id] }),
}));


const Application = pgTable("application", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
  status: varchar("status", { length: 255 })
    .$type<"pending" | "accepted" | "checkedin" | "rejected">()
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
    .$onUpdateFn(() => sql`now()`),

  // application inputs
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  age: varchar("age", { length: 255 }).notNull(),
  country: varchar("country", { length: 255 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  school: varchar("school", { length: 255 }).notNull(),
  major: varchar("major", { length: 255 }).notNull(),
  classification: varchar("classification", { length: 255 })
    .$type<"Highschool" | "Freshman" | "Sophomore" | "Junior" | "Senior+">()
    .notNull(),
  gradYear: integer("grad_year").notNull(),
  gender: varchar("gender", { length: 255 }).notNull(),
  hasTeam: varchar("has_team", { length: 255 }).notNull(),
  race: varchar("race", { length: 255 }).notNull(),
  hackathonsAttended: varchar("hackathons_attended", { length: 255 }).notNull(),
  experience: varchar("experience", { length: 255 })
    .$type<"Beginner" | "Intermediate" | "Advanced">()
    .notNull(),
  eventSource: varchar("event_source", { length: 255 }).notNull(),
  shirtSize: varchar("shirt_size", { length: 255 })
    .$type<"S" | "M" | "L" | "XL" | "XXL">()
    .notNull(),
  resume: varchar("resume", { length: 255 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  references: varchar("references", { length: 255 }).notNull(),
  joke: varchar("joke", { length: 255 }).notNull(),
  dietaryRestriction: varchar("dietary_restriction", { length: 255 }).notNull(),
  extraInfo: varchar("extra_info", { length: 255 }).notNull(),
});