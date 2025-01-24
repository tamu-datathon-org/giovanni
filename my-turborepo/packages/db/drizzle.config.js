"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
if (!process.env.POSTGRES_URL) {
  throw new Error("Missing POSTGRES_URL");
}
var nonPoolingUrl = process.env.POSTGRES_URL.replace(":6543", ":5432");
exports.default = {
  schema: "./src/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: nonPoolingUrl },
  tablesFilter: ["t3turbo_*"],
  out: "./drizzle",
};
