-- Convert emailVerified from datetime to bool (all values are null, so safe to convert)
DO $$
BEGIN
    -- Check if emailVerified exists as timestamp/datetime type
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user' 
        AND column_name = 'emailVerified'
        AND data_type IN ('timestamp without time zone', 'timestamp with time zone')
    ) THEN
        -- Since all values are null, we can safely drop and recreate as boolean
        ALTER TABLE "user" DROP COLUMN "emailVerified";
        ALTER TABLE "user" ADD COLUMN "emailVerified" boolean NOT NULL DEFAULT false;
    ELSIF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user' 
        AND column_name = 'emailVerified'
    ) THEN
        -- Column doesn't exist, just add it
        ALTER TABLE "user" ADD COLUMN "emailVerified" boolean NOT NULL DEFAULT false;
    END IF;
    -- If it already exists as boolean, do nothing
END $$;

-- Session schema changes for next-auth v4 compatibility
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'session' 
        AND column_name = 'expires'
    ) THEN
        ALTER TABLE "session" RENAME COLUMN "expires" TO "expiresAt";
    END IF;
    
    -- Add createdAt if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'session' 
        AND column_name = 'createdAt'
    ) THEN
        ALTER TABLE "session" ADD COLUMN "createdAt" timestamp with time zone NOT NULL DEFAULT now();
    END IF;
    
    -- Add updatedAt if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'session' 
        AND column_name = 'updatedAt'
    ) THEN
        ALTER TABLE "session" ADD COLUMN "updatedAt" timestamp with time zone NOT NULL DEFAULT now();
    END IF;
END $$;

-- Account schema changes for next-auth v4 and Better Auth
DO $$
BEGIN
    -- Rename provider columns if they exist
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'account' 
        AND column_name = 'provider'
    ) THEN
        ALTER TABLE "account" RENAME COLUMN "provider" TO "providerId";
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'account' 
        AND column_name = 'providerAccountId'
    ) THEN
        ALTER TABLE "account" RENAME COLUMN "providerAccountId" TO "accountId";
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'account' 
        AND column_name = 'refresh_token'
    ) THEN
        ALTER TABLE "account" RENAME COLUMN "refresh_token" TO "refreshToken";
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'account' 
        AND column_name = 'access_token'
    ) THEN
        ALTER TABLE "account" RENAME COLUMN "access_token" TO "accessToken";
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'account' 
        AND column_name = 'id_token'
    ) THEN
        ALTER TABLE "account" RENAME COLUMN "id_token" TO "idToken";
    END IF;
END $$;

-- Handle accessTokenExpiresAt: migrate data from expires_at before dropping it
DO $$
BEGIN
    -- Add accessTokenExpiresAt if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'account' 
        AND column_name = 'accessTokenExpiresAt'
    ) THEN
        ALTER TABLE "account" ADD COLUMN "accessTokenExpiresAt" timestamp with time zone;
        
        -- Migrate data from expires_at if it exists
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'account' 
            AND column_name = 'expires_at'
        ) THEN
            UPDATE "account" SET "accessTokenExpiresAt" =
                CASE
                    WHEN "expires_at" IS NOT NULL THEN to_timestamp("expires_at")
                    ELSE NULL
                END;
            
            -- Only drop expires_at after data is migrated
            ALTER TABLE "account" DROP COLUMN "expires_at";
        END IF;
    END IF;
END $$;

-- Add createdAt and updatedAt if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'account' 
        AND column_name = 'createdAt'
    ) THEN
        ALTER TABLE "account" ADD COLUMN "createdAt" timestamp with time zone NOT NULL DEFAULT now();
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'account' 
        AND column_name = 'updatedAt'
    ) THEN
        ALTER TABLE "account" ADD COLUMN "updatedAt" timestamp with time zone NOT NULL DEFAULT now();
    END IF;
END $$;

-- Remove unused fields (only if they exist and are truly unused)
ALTER TABLE "account" DROP COLUMN IF EXISTS "session_state";
ALTER TABLE "account" DROP COLUMN IF EXISTS "type";
ALTER TABLE "account" DROP COLUMN IF EXISTS "token_type";