-- Convert emailVerified from datetime to bool
ALTER TABLE "user" ADD COLUMN "email_verified_bool" boolean NOT NULL DEFAULT false;
ALTER TABLE "user" DROP COLUMN "emailVerified";
ALTER TABLE "user" RENAME COLUMN "email_verified_bool" TO "emailVerified";

-- Session schema changes for next-auth v4 compatibility
ALTER TABLE "session" RENAME COLUMN "expires" TO "expiresAt";
ALTER TABLE "session" RENAME COLUMN "sessionToken" TO "token";
ALTER TABLE "session" ADD COLUMN "createdAt" timestamp with time zone NOT NULL DEFAULT now();
ALTER TABLE "session" ADD COLUMN "updatedAt" timestamp with time zone NOT NULL DEFAULT now();

-- Account schema changes for next-auth v4 and Better Auth
ALTER TABLE "account" RENAME COLUMN "provider" TO "providerId";
ALTER TABLE "account" RENAME COLUMN "providerAccountId" TO "accountId";
ALTER TABLE "account" RENAME COLUMN "refresh_token" TO "refreshToken";
ALTER TABLE "account" RENAME COLUMN "access_token" TO "accessToken";
ALTER TABLE "account" RENAME COLUMN "id_token" TO "idToken";

-- Handle accessTokenExpiresAt: prefer expires_at, fallback to access_token_expires
-- If both exist, migrate data and drop old columns
ALTER TABLE "account" ADD COLUMN "accessTokenExpiresAt" timestamp with time zone;
UPDATE "account" SET "accessTokenExpiresAt" =
  CASE
    WHEN "expires_at" IS NOT NULL THEN to_timestamp("expires_at")
    ELSE NULL
  END;
ALTER TABLE "account" DROP COLUMN IF EXISTS "expires_at";

-- Add createdAt and updatedAt
ALTER TABLE "account" ADD COLUMN "createdAt" timestamp with time zone NOT NULL DEFAULT now();
ALTER TABLE "account" ADD COLUMN "updatedAt" timestamp with time zone NOT NULL DEFAULT now();

-- Remove unused fields
ALTER TABLE "account" DROP COLUMN IF EXISTS "session_state";
ALTER TABLE "account" DROP COLUMN IF EXISTS "type";
ALTER TABLE "account" DROP COLUMN IF EXISTS "token_type";
