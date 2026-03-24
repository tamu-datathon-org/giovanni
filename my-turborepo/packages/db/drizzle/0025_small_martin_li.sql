ALTER TABLE "application" ALTER COLUMN "school" SET DATA TYPE varchar(200);--> statement-breakpoint
ALTER TABLE "application" ALTER COLUMN "address" SET DATA TYPE varchar(500);--> statement-breakpoint
ALTER TABLE "application" ADD COLUMN "acceptance_status" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ADD COLUMN "capacity" integer DEFAULT 0 NOT NULL;