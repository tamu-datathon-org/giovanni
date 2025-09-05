ALTER TABLE "account" ADD COLUMN "id" text NOT NULL DEFAULT gen_random_uuid()::text;
ALTER TABLE "account" DROP CONSTRAINT "account_provider_providerAccountId_pk";
ALTER TABLE "account" DROP CONSTRAINT "account_userId_user_id_fk";
ALTER TABLE "account" ADD PRIMARY KEY ("id");

-- Update session id primary key
ALTER TABLE "session" ADD COLUMN "id" text NOT NULL DEFAULT gen_random_uuid()::text;
ALTER TABLE "session" DROP CONSTRAINT IF EXISTS "session_pkey";
ALTER TABLE "session" DROP CONSTRAINT IF EXISTS "session_userId_user_id_fk";
ALTER TABLE "session" ADD PRIMARY KEY ("id");
