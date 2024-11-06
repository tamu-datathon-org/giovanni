CREATE TABLE IF NOT EXISTS "application" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"status" varchar(255) NOT NULL,
	"event_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"age" varchar(255) NOT NULL,
	"country" varchar(255) NOT NULL,
	"phone_number" varchar(25) NOT NULL,
	"school" varchar(255) NOT NULL,
	"major" varchar(255) NOT NULL,
	"classification" varchar(255) NOT NULL,
	"grad_year" integer NOT NULL,
	"gender" varchar(255) NOT NULL,
	"has_team" varchar(255) NOT NULL,
	"race" varchar(255) NOT NULL,
	"hackathons_attended" varchar(255) NOT NULL,
	"experience" varchar(255) NOT NULL,
	"event_source" varchar(255) NOT NULL,
	"shirt_size" varchar(255) NOT NULL,
	"resume" text NOT NULL,
	"address" varchar(255) NOT NULL,
	"references" varchar(255) NOT NULL,
	"interest_one" varchar(500) NOT NULL,
	"interest_two" varchar(500) NOT NULL,
	"interest_three" varchar(500) NOT NULL,
	"dietary_restriction" varchar(255) NOT NULL,
	"extra_info" varchar(255) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "application" ADD CONSTRAINT "application_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "application" ADD CONSTRAINT "application_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
