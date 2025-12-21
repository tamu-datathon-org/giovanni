-- Add id column to account if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'account' AND column_name = 'id'
    ) THEN
        ALTER TABLE "account" ADD COLUMN "id" text NOT NULL DEFAULT gen_random_uuid()::text;
    END IF;
END $$;

ALTER TABLE "account" DROP CONSTRAINT IF EXISTS "account_provider_providerAccountId_pk";
ALTER TABLE "account" DROP CONSTRAINT IF EXISTS "account_userId_user_id_fk";

-- Only set primary key if id column exists and isn't already primary key
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'account' AND column_name = 'id'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu 
            ON tc.constraint_name = kcu.constraint_name
        WHERE tc.table_name = 'account' 
            AND tc.constraint_type = 'PRIMARY KEY'
            AND kcu.column_name = 'id'
    ) THEN
        ALTER TABLE "account" ADD PRIMARY KEY ("id");
    END IF;
END $$;

-- Update session id primary key - check if id column exists first
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'session' AND column_name = 'id'
    ) THEN
        ALTER TABLE "session" ADD COLUMN "id" text NOT NULL DEFAULT gen_random_uuid()::text;
    END IF;
END $$;

ALTER TABLE "session" DROP CONSTRAINT IF EXISTS "session_pkey";
ALTER TABLE "session" DROP CONSTRAINT IF EXISTS "session_userId_user_id_fk";

-- Only set primary key if id column exists and isn't already primary key
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'session' AND column_name = 'id'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu 
            ON tc.constraint_name = kcu.constraint_name
        WHERE tc.table_name = 'session' 
            AND tc.constraint_type = 'PRIMARY KEY'
            AND kcu.column_name = 'id'
    ) THEN
        ALTER TABLE "session" ADD PRIMARY KEY ("id");
    END IF;
END $$;