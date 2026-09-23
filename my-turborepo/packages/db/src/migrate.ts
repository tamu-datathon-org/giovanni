// Env comes from the `with-env` wrapper on the db:migrate script (dotenv-cli),
// not from a `dotenv/config` import — `dotenv` isn't a dependency of this package.
import { migrate } from "drizzle-orm/vercel-postgres/migrator";

import { db } from "./client";

// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: "./drizzle" });
