-- Data-only fix for users who signed up under Auth.js (next-auth) before the better-auth switch.
-- 0016 renamed the account columns but kept Auth.js's provider value 'auth0', while better-auth now
-- signs in with per-connection IDs ('auth0-google-oauth2', ...). The accountId (Auth0 `sub`) is the same.

-- Remap legacy Auth0 rows to the per-connection provider IDs better-auth uses.
-- Skips rows whose identity already has a new-style row (already linked, or a duplicate user to merge by hand).
UPDATE "account" a
SET "providerId" = 'auth0-' || split_part(a."accountId", '|', 1), "updatedAt" = now()
WHERE a."providerId" = 'auth0'
  AND split_part(a."accountId", '|', 1) IN ('google-oauth2', 'windowslive', 'github')
  AND NOT EXISTS (
    SELECT 1 FROM "account" b
    WHERE b."providerId" = 'auth0-' || split_part(a."accountId", '|', 1)
      AND b."accountId" = a."accountId"
  );
--> statement-breakpoint
-- Restore emailVerified (0016 reset it to false) for users whose email Google/Microsoft verified,
-- so signing in with a different provider can still auto-link. GitHub is left out on purpose:
-- its emails aren't always verified, which is the account-takeover case this check guards against.
UPDATE "user" u
SET "emailVerified" = true, "updated_at" = now()
WHERE u."emailVerified" = false
  AND EXISTS (
    SELECT 1 FROM "account" a
    WHERE a."userId" = u.id
      AND a."providerId" IN ('auth0-google-oauth2', 'auth0-windowslive')
  );
