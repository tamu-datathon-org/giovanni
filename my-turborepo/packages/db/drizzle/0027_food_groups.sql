-- Idempotent: safe if columns already exist (applied manually or partial migrate).
ALTER TABLE "event" ADD COLUMN IF NOT EXISTS "food_groups" text[] DEFAULT '{}'::text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "application" ADD COLUMN IF NOT EXISTS "food_group" varchar(255);
