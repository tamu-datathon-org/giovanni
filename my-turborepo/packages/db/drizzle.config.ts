// packages/db/drizzle.config.ts
import type { Config } from "drizzle-kit";
import * as path from "node:path";
import * as dotenv from "dotenv";

// Load the root .env (adjust path if needed)
dotenv.config({
  path: path.resolve(__dirname, "..", "..", ".env"),
});

if (!process.env.POSTGRES_URL) {
  throw new Error("Missing POSTGRES_URL");
}

const nonPoolingUrl = process.env.POSTGRES_URL.replace(":6543", ":5432");

export default {
  schema: ["./src/schema.ts", "./src/auth-schema.ts"],
  dialect: "postgresql",
  dbCredentials: { url: nonPoolingUrl },
  tablesFilter: ["t3turbo_*"],
  out: "./drizzle",
} satisfies Config;
