import { relations } from "drizzle-orm";
import {
	pgTable,
	uuid,
	varchar,
	timestamp,
	boolean,
	text,
	primaryKey
} from "drizzle-orm/pg-core";

// User Table
export const User = pgTable("user", {
	id: uuid("id").notNull().primaryKey().defaultRandom(),
	name: varchar("name", { length: 255 }),
	email: varchar("email", { length: 255 }).notNull(),
	emailVerified: boolean("emailVerified").notNull().default(false),
	image: varchar("image", { length: 255 }),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});

// Account Table
export const Account = pgTable(
	"account",
	{
		id: uuid("id").notNull().primaryKey().defaultRandom(),
		accountId: varchar("accountId", { length: 255 }).notNull(),
		providerId: varchar("providerId", { length: 255 }).notNull(),
		userId: uuid("userId").notNull().references(() => User.id, { onDelete: "cascade" }),
		accessToken: text("accessToken"),
		refreshToken: varchar("refreshToken", { length: 255 }),
		idToken: text("idToken"),
		accessTokenExpiresAt: timestamp("accessTokenExpiresAt", { withTimezone: true }),
		refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt", { withTimezone: true }),
		scope: varchar("scope", { length: 255 }),
		password: text("password"),
		createdAt: timestamp("createdAt", { withTimezone: true }).notNull().defaultNow(),
		updatedAt: timestamp("updatedAt", { withTimezone: true }).notNull().defaultNow(),
	}
);

// Session Table
export const Session = pgTable("session", {
	id: uuid("id").notNull().primaryKey().defaultRandom(),
	expiresAt: timestamp("expiresAt", { withTimezone: true }).notNull(),
	token: varchar("token", { length: 255 }).notNull(),
	createdAt: timestamp("createdAt", { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp("updatedAt", { withTimezone: true }).notNull().defaultNow(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: uuid("userId").notNull().references(() => User.id, { onDelete: "cascade" }),
});

export const verification = pgTable("verification", {
	id: uuid("id").notNull().primaryKey().defaultRandom(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});


// Relations
export const AccountRelations = relations(Account, ({ one }) => ({
	user: one(User, { fields: [Account.userId], references: [User.id] }),
}));

export const SessionRelations = relations(Session, ({ one }) => ({
	user: one(User, { fields: [Session.userId], references: [User.id] }),
}));
