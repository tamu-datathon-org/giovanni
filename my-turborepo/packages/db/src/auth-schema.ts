import { relations } from "drizzle-orm";
import {
	pgTable,
	uuid,
	varchar,
	timestamp,
	integer,
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
	image: varchar("image", { length: 255 })
});

// Account Table
export const Account = pgTable(
	"account",
	{
		userId: uuid("userId").notNull().references(() => User.id, { onDelete: "cascade" }),
		providerId: varchar("providerId", { length: 255 }).notNull(),
		accountId: varchar("accountId", { length: 255 }).notNull(),
		refreshToken: varchar("refreshToken", { length: 255 }),
		accessToken: text("accessToken"),
		accessTokenExpiresAt: timestamp("accessTokenExpiresAt", { withTimezone: true }),
		scope: varchar("scope", { length: 255 }),
		idToken: text("idToken"),
		createdAt: timestamp("createdAt", { withTimezone: true }).notNull().defaultNow(),
		updatedAt: timestamp("updatedAt", { withTimezone: true }).notNull().defaultNow(),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.providerId, account.accountId],
		}),
	})
);

// Session Table
export const Session = pgTable("session", {
	token: varchar("token", { length: 255 }).notNull().primaryKey(),
	userId: uuid("userId").notNull().references(() => User.id, { onDelete: "cascade" }),
	expiresAt: timestamp("expiresAt", { withTimezone: true }).notNull(),
	createdAt: timestamp("createdAt", { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp("updatedAt", { withTimezone: true }).notNull().defaultNow(),
});

// Relations
export const AccountRelations = relations(Account, ({ one }) => ({
	user: one(User, { fields: [Account.userId], references: [User.id] }),
}));

export const SessionRelations = relations(Session, ({ one }) => ({
	user: one(User, { fields: [Session.userId], references: [User.id] }),
}));
