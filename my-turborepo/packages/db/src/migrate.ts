import 'dotenv/config';
import { migrate } from 'drizzle-orm/vercel-postgres/migrator';
import { sql } from "@vercel/postgres";
import { db } from './client';

// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: './drizzle' });
