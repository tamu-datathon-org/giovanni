DO $$ BEGIN
 CREATE TYPE "public"."attendance_phase" AS ENUM('main', 'meal1', 'meal2', 'meal3', 'meal4');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "attendance" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"application_id" uuid NOT NULL,
	"event_id" uuid NOT NULL,
	"phase" "attendance_phase" NOT NULL,
	"checked_in" boolean DEFAULT false NOT NULL,
	"checked_in_at" timestamp with time zone,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attendance" ADD CONSTRAINT "attendance_application_id_application_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."application"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attendance" ADD CONSTRAINT "attendance_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "attendance_application_event_phase_uniq" ON "attendance" ("application_id","event_id","phase");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "attendance_application_idx" ON "attendance" ("application_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "attendance_event_idx" ON "attendance" ("event_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "attendance_phase_idx" ON "attendance" ("phase");