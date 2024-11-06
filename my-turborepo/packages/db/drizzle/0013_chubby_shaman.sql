ALTER TABLE "application" ADD COLUMN "waitlist_email" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "application" ADD COLUMN "rejection_email" boolean DEFAULT false NOT NULL;