-- Convert account.id from text to uuid (only if it's currently text)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'account' 
        AND column_name = 'id'
        AND data_type = 'text'
    ) THEN
        ALTER TABLE "account" ALTER COLUMN "id" DROP DEFAULT;
        ALTER TABLE "account" ALTER COLUMN "id" TYPE uuid USING id::uuid;
        ALTER TABLE "account" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
    ELSIF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'account' 
        AND column_name = 'id'
        AND data_type = 'uuid'
    ) THEN
        -- Already uuid, just ensure default is set
        ALTER TABLE "account" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
    END IF;
END $$;

-- Convert session.id from text to uuid (only if it's currently text)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'session' 
        AND column_name = 'id'
        AND data_type = 'text'
    ) THEN
        ALTER TABLE "session" ALTER COLUMN "id" DROP DEFAULT;
        ALTER TABLE "session" ALTER COLUMN "id" TYPE uuid USING id::uuid;
        ALTER TABLE "session" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
    ELSIF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'session' 
        AND column_name = 'id'
        AND data_type = 'uuid'
    ) THEN
        -- Already uuid, just ensure default is set
        ALTER TABLE "session" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
    END IF;
END $$;

-- Convert verification.id from text to uuid (only if it's currently text)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'verification' 
        AND column_name = 'id'
        AND data_type = 'text'
    ) THEN
        ALTER TABLE "verification" ALTER COLUMN "id" DROP DEFAULT;
        ALTER TABLE "verification" ALTER COLUMN "id" TYPE uuid USING id::uuid;
        ALTER TABLE "verification" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
    ELSIF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'verification' 
        AND column_name = 'id'
        AND data_type = 'uuid'
    ) THEN
        -- Already uuid, just ensure default is set
        ALTER TABLE "verification" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
    END IF;
END $$;

DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;