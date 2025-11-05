CREATE TABLE IF NOT EXISTS "event_phase" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_id" uuid NOT NULL,
	"name" varchar(50) NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
DROP INDEX IF EXISTS "attendance_application_event_phase_uniq";--> statement-breakpoint
DROP INDEX IF EXISTS "attendance_phase_idx";--> statement-breakpoint
ALTER TABLE "attendance" ADD COLUMN "event_phase_id" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event_phase" ADD CONSTRAINT "event_phase_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "event_phase_event_name_uniq" ON "event_phase" ("event_id","name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "event_phase_event_idx" ON "event_phase" ("event_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attendance" ADD CONSTRAINT "attendance_event_phase_id_event_phase_id_fk" FOREIGN KEY ("event_phase_id") REFERENCES "public"."event_phase"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "attendance_app_eventphase_uniq" ON "attendance" ("application_id","event_phase_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "attendance_event_phase_idx" ON "attendance" ("event_phase_id");--> statement-breakpoint
ALTER TABLE "attendance" DROP COLUMN IF EXISTS "phase";