# Repository Documentation & Cleanup Guide

**Last Updated:** January 2025  
**Purpose:** Comprehensive overview of repository structure, redundant code identification, and optimization recommendations for next semester cleanup.

---

## Table of Contents

1. [Repository Structure Overview](#repository-structure-overview)
2. [Detailed Project Analysis](#detailed-project-analysis)
3. [Component Mapping & Duplicates](#component-mapping--duplicates)
4. [API Router Documentation](#api-router-documentation)
5. [Database Architecture](#database-architecture)
6. [Deployment Architecture](#deployment-architecture)
7. [Issues & Recommendations](#issues--recommendations)
8. [Cleanup Priority Checklist](#cleanup-priority-checklist)

---

## Repository Structure Overview

### High-Level Structure

```text
giovanni/
├── my-turborepo/              # Main Turborepo monorepo
│   ├── apps/                  # Application packages
│   ├── packages/              # Shared packages
│   ├── tooling/               # Shared tooling configurations
│   ├── port_later/            # ⚠️ DEPRECATED/MOVED code
│   ├── turbo.json             # Turborepo configuration
│   ├── pnpm-workspace.yaml    # PNPM workspace configuration
│   └── vercel.json            # Vercel deployment config
├── leaderboard/               # Standalone Next.js app (outside monorepo)
└── package.json               # Root package.json (minimal)
```

### Technology Stack

-   **Monorepo Manager:** Turborepo
-   **Package Manager:** PNPM (v10.20.0)
-   **Frontend Framework:** Next.js 14 (App Router)
-   **Backend API:** tRPC v11
-   **Database ORM:**
    -   Drizzle ORM (monorepo)
    -   Prisma (leaderboard app - standalone)
-   **UI Framework:**
    -   Tailwind CSS
    -   shadcn/ui components
    -   Radix UI primitives
-   **Authentication:** Better Auth (monorepo), NextAuth.js (leaderboard)
-   **Type Safety:** TypeScript 5.9.3

---

## Detailed Project Analysis

### Monorepo Applications (`my-turborepo/apps/`)

#### 1. `team-website/` - Main Application (Port 3000)

**Purpose:** Primary TAMU Datathon website with full application management system

**Key Features:**

-   Public-facing landing page (Hero, About, Team, Contact sections)
-   Application submission system (`/apply`)
-   Organizer dashboard (`/organizer/*`)
    -   Application management (`/organizer/applications`)
    -   Participant passport/check-in system (`/organizer/passport`)
    -   Schedule manager (`/organizer/schedule-manager`)
    -   Vetting system (`/organizer/manage`)
-   Admin panel (`/admin/jankury`)
-   Pre-registration system (`/preregistration`)
-   Authentication and authorization

**Technologies:**

-   Next.js 15 RC with App Router
-   React 19 RC
-   tRPC with React Query
-   Windows 95 aesthetic (w95fa font, retro UI components)

**Dependencies on Shared Packages:**

-   `@vanni/api` - tRPC API routes
-   `@vanni/auth` - Authentication
-   `@vanni/db` - Database access
-   `@vanni/ui` - Shared UI components
-   `@vanni/validators` - Validation schemas

**Port:** 3000

---

#### 2. `event-website/` - Event Landing Page (Port 3004)

**Purpose:** Public-facing event information and marketing site

**Key Features:**

-   Hero section with typing animation
-   Location information
-   Prizes showcase
-   Sponsors display
-   FAQ section
-   Challenges listing (`/challenges`)
-   Schedule page (`/schedule`)

**Technologies:**

-   Next.js 14 with App Router
-   React 18
-   MDX for content (challenge descriptions)
-   Motion animations

**Dependencies on Shared Packages:**

-   `@vanni/ui` - Shared UI components
-   `@vanni/validators` - Validation schemas
-   Does NOT use `@vanni/api` (static/marketing site)

**Port:** 3004

**⚠️ Overlap Concern:** Both `team-website` and `event-website` serve similar purposes as event websites. Need clarification on their distinct roles.

---

#### 3. `auth-proxy/` - OAuth Proxy (Nitro Server)

**Purpose:** Proxy OAuth requests for preview deployments

**Technologies:**

-   Nitro (serverless framework)
-   Auth.js Core
-   H3 framework

**Usage:** Required for OAuth to work in Vercel preview deployments. Deployed as separate serverless function.

---

#### 4. `datathon-blog/` - Blog Application (Port 3001)

**Purpose:** Blog for posting datathon challenge solutions and updates

**Key Features:**

-   Blog post listing
-   Individual post pages
-   Markdown-based content (`posts/*.md`)

**Technologies:**

-   Next.js 14 (Pages Router)
-   Gray Matter for markdown processing
-   Tailwind CSS

**Port:** 3001

---

#### 5. `docs-nextra/` - ⚠️ EMPTY/UNUSED

**Status:** **CRITICAL - DELETE RECOMMENDED**

**Evidence:**

-   Empty `package.json` (only name and version)
-   No source code files
-   Not referenced in any build configurations
-   Likely leftover from template or abandoned project

**Action:** Delete entirely

---

### Shared Packages (`my-turborepo/packages/`)

#### 1. `api/` - tRPC API Routers

**Purpose:** Centralized API definition using tRPC

**Router Structure:**

-   `auth.ts` - Authentication routes
-   `account.ts` - User account management
-   `application.ts` - Application submission and management
-   `email.ts` - Email querying and management
-   `emailSendingRouter.ts` - Email sending functionality
-   `event.ts` - Event management
-   `organizer.ts` - Organizer-specific operations
-   `post.ts` - Blog post operations
-   `preregistration.ts` - Pre-registration system
-   `test.ts` - ⚠️ Development/testing routes (should be reviewed)

**Exports:** Type-safe tRPC router types for client usage

---

#### 2. `auth/` - Authentication Package

**Purpose:** Authentication configuration and middleware

**Features:**

-   Better Auth setup
-   Auth schemas
-   Middleware for route protection
-   Environment variable validation

---

#### 3. `db/` - Database Package

**Purpose:** Database schema and client using Drizzle ORM

**Contents:**

-   Database schema definitions (`schema.ts`, `auth-schema.ts`)
-   Database client setup
-   Migration files (24+ migration files in `drizzle/` directory)
-   Drizzle Kit configuration

**Database:** PostgreSQL (Vercel Postgres compatible)

**Migration Files:** Consider reviewing and potentially squashing older migrations

---

#### 4. `ui/` - Shared UI Components

**Purpose:** Reusable UI component library

**Components:** Based on shadcn/ui patterns

-   Button, Card, Dialog, Input, etc.
-   Radix UI primitives
-   Tailwind CSS styling

**Note:** Both `team-website` and `event-website` have duplicate UI components that could be moved here.

---

#### 5. `validators/` - Validation Schemas

**Purpose:** Shared Zod validation schemas

**Usage:** Used across apps and API for type-safe validation

---

### Standalone Application

#### `leaderboard/` - Leaderboard Application (Outside Monorepo)

**Purpose:** Standalone leaderboard display application

**Key Features:**

-   Top 3 teams display
-   Relative leaderboard (team rankings around user's team)
-   Real-time score updates

**Technologies:**

-   Next.js 15 RC with App Router
-   React 19 RC
-   Prisma ORM (⚠️ Different from monorepo's Drizzle)
-   NextAuth.js (⚠️ Different from monorepo's Better Auth)
-   tRPC (standalone setup, not using `@vanni/api`)

**⚠️ Inconsistency:** Uses different ORM and auth than monorepo. Consider migration to monorepo for consistency.

---

### Deprecated Code

#### `port_later/` - Deprecated Directory

**Status:** **CRITICAL - REVIEW AND CLEANUP REQUIRED**

**Contents:**

1. **`SQL_Game/`** - Has hardcoded paths to `apps/team-website`:

    ```typescript
    // Lines 3, 7-12, 15 reference:
    import Title from "apps/team-website/src/app/challenges/helpers/Title";
    import Bold from "../../apps/team-website/src/app/challenges/helpers/Bold";
    // etc.
    ```

    - **Issue:** References code that may not exist
    - **Action:** Review if needed, move to appropriate app, or delete

2. **`docs-nextra/`** - Unused documentation template
    - **Action:** Delete if not being used

---

## Component Mapping & Duplicates

### Duplicate Components Between `team-website` and `event-website`

Both apps contain nearly identical implementations of:

#### Common Components

| Component          | team-website Location | event-website Location | Recommendation      |
| ------------------ | --------------------- | ---------------------- | ------------------- |
| `Breadcrumb.tsx`   | `components/Common/`  | `components/Common/`   | Move to `@vanni/ui` |
| `ScrollUp.tsx`     | `components/Common/`  | `components/Common/`   | Move to `@vanni/ui` |
| `SectionTitle.tsx` | `components/Common/`  | `components/Common/`   | Move to `@vanni/ui` |

#### Contact Components

| Component               | team-website Location | event-website Location | Recommendation                           |
| ----------------------- | --------------------- | ---------------------- | ---------------------------------------- |
| `ContactBackground.tsx` | `components/Contact/` | `components/Contact/`  | Move to `@vanni/ui` or keep app-specific |
| `index.tsx`             | `components/Contact/` | `components/Contact/`  | Review if truly identical                |
| `NewsLatterBox.tsx`     | `components/Contact/` | `components/Contact/`  | Move to `@vanni/ui`                      |

#### Footer & Header

| Component                        | team-website Location | event-website Location | Recommendation                            |
| -------------------------------- | --------------------- | ---------------------- | ----------------------------------------- |
| `Footer/index.tsx`               | `components/Footer/`  | `components/Footer/`   | Review differences, potentially merge     |
| `Header/index.tsx`               | `components/Header/`  | `components/Header/`   | Keep separate (different implementations) |
| `instagram-logo-svgrepo-com.svg` | Both apps             | Both apps              | Move to shared assets                     |

#### Utility Components

| Component               | team-website Location     | event-website Location    | Recommendation      |
| ----------------------- | ------------------------- | ------------------------- | ------------------- |
| `ScrollToTop/index.tsx` | `components/ScrollToTop/` | `components/ScrollToTop/` | Move to `@vanni/ui` |
| `error/page.tsx`        | `components/error/`       | `components/error/`       | Move to `@vanni/ui` |

#### UI Components (Overlap)

| Component                   | team-website Location | event-website Location | Recommendation          |
| --------------------------- | --------------------- | ---------------------- | ----------------------- |
| `button.tsx`                | `components/ui/`      | `components/ui/`       | Use `@vanni/ui` version |
| `card.tsx`                  | `components/ui/`      | `components/ui/`       | Use `@vanni/ui` version |
| `carousel.tsx`              | `components/ui/`      | `components/ui/`       | Use `@vanni/ui` version |
| `toast.tsx` / `toaster.tsx` | `components/ui/`      | `components/ui/`       | Use `@vanni/ui` version |

**Action Items:**

1. Audit each duplicate component to determine if truly identical
2. Create migration plan to move common components to `@vanni/ui`
3. Update imports across both apps
4. Remove duplicate implementations

---

### App-Specific Components (Keep Separate)

#### `team-website/` Unique Components

-   `AboutSectionOne.tsx`, `AboutSectionTwo.tsx` - App-specific content
-   `AboutTeam/` - Team member display
-   `Apply/` - Application form components
-   Organizer components (`_components/organizer/`)
-   Admin components (`admin/jankury/`)
-   Windows 95 aesthetic components

#### `event-website/` Unique Components

-   `Hero/` - Event-specific hero with typing animation
-   `location/` - Event location display
-   `prizes/` - Prize showcase
-   `sponsor/` - Sponsor display
-   `timeline/` - Event timeline
-   `challenge-card/` - Challenge card component
-   `faq/` - FAQ section

---

## API Router Documentation

### Available Routers

All routers are defined in `packages/api/src/router/` and exported from `packages/api/src/root.ts`.

#### 1. `authRouter` - Authentication

**File:** `router/auth.ts`

**Procedures:**

-   `getSession` - Get current user session (public)
-   `getSecretMessage` - Protected test endpoint
-   `validateOrganizerAuth` - Validate organizer permissions (protected)

**Usage:** Used in `team-website` app for authentication checks

---

#### 2. `accountRouter` - Account Management

**File:** `router/account.ts`

**Procedures:**

-   Account-related operations

**Usage:** Used for user account management

---

#### 3. `applicationRouter` - Application Management

**File:** `router/application.ts`

**Procedures:**

-   Application submission
-   Application status management
-   Batch status updates

**Usage:** Core to `team-website` app's application system

---

#### 4. `emailRouter` - Email Operations

**File:** `router/email.ts`

**Procedures:**

-   `getEmailByLabel` - Query emails by label
-   `getAllEmails` - Get all emails
-   `getApplicationEmailsByEvent` - Get application emails for event

**Usage:** Used in admin panel and organizer tools

---

#### 5. `emailSendingRouter` - Email Sending

**File:** `router/emailSendingRouter.ts`

**Procedures:**

-   Bulk email sending
-   Email queue management

**Usage:** Used for sending confirmation emails, notifications

---

#### 6. `eventRouter` - Event Management

**File:** `router/event.ts`

**Procedures:**

-   Event CRUD operations
-   Event phase management

**Usage:** Used throughout `team-website` app for event configuration

---

#### 7. `organizerRouter` - Organizer Operations

**File:** `router/organizer.ts`

**Procedures:**

-   Organizer-specific operations
-   Participant management
-   Check-in operations

**Usage:** Used in `/organizer/*` routes

---

#### 8. `postRouter` - Blog Posts

**File:** `router/post.ts`

**Procedures:**

-   `all` - Get all posts (public)
-   `byId` - Get post by ID (public)
-   `create` - Create post (protected)
-   `delete` - Delete post (protected)

**Usage:** Used for blog functionality (though `datathon-blog` app may not use this)

---

#### 9. `preregistrationRouter` - Pre-registration

**File:** `router/preregistration.ts`

**Procedures:**

-   Pre-registration submission
-   Pre-registration validation

**Usage:** Used in `/preregistration` route

---

#### 10. `testRouter` - ⚠️ Testing/Development

**File:** `router/test.ts`

**Procedures:**

-   `testQuery` - Public test query
-   `testMutation` - Public test mutation
-   `testProtectedProcedure` - Protected test
-   `testAdminProcedure` - Admin test

**Status:** **REVIEW REQUIRED** - Development/testing only

**Recommendation:**

-   Remove if not used in production
-   Or move to development-only environment
-   Currently exposed in production router

---

### Router Usage in Apps

**`team-website` app uses:**

-   ✅ `authRouter` - Authentication
-   ✅ `accountRouter` - Account management
-   ✅ `applicationRouter` - Applications
-   ✅ `emailRouter` - Email operations
-   ✅ `emailSendingRouter` - Email sending
-   ✅ `eventRouter` - Events
-   ✅ `organizerRouter` - Organizer tools
-   ✅ `preregistrationRouter` - Pre-registration
-   ❓ `postRouter` - Likely used for blog posts
-   ⚠️ `testRouter` - Should not be in production

**`event-website` app:**

-   Does NOT use tRPC API (static/marketing site)

**`leaderboard` app:**

-   Has its own tRPC setup (not using `@vanni/api`)

---

## Database Architecture

### Monorepo Database (`packages/db/`)

**ORM:** Drizzle ORM  
**Database:** PostgreSQL (Vercel Postgres compatible)

#### Schema Structure

**Main Tables:**

-   `Post` - Blog posts
-   `Preregistration` - Pre-registration entries
-   `Event` - Event information
-   `Role` - User roles for events
-   `Application` - Application submissions
-   `ApplicationStatus` - Application status tracking
-   `Email` - Email management
-   `Participant` - Participant information
-   Plus auth-related tables (User, Account, Session, etc.)

**Migration Files:** 24+ migration files in `packages/db/drizzle/`

**Recommendation:** Consider reviewing migration history and squashing older migrations if possible.

---

### Leaderboard Database (`leaderboard/`)

**ORM:** Prisma  
**Database:** PostgreSQL

#### Schema Structure

**Main Tables:**

-   `Team` - Team information with points/ranking
-   `User` - User accounts (NextAuth)
-   `Account`, `Session`, `VerificationToken` - Auth tables
-   `Post` - Example/blog post table (may be unused)

**⚠️ Inconsistency:** Different ORM than monorepo. Consider migration to Drizzle for consistency.

---

## Deployment Architecture

### Vercel Configuration

**File:** `my-turborepo/vercel.json`

```json
{
    "github": {
        "silent": true
    }
}
```

### Application Ports

| App             | Port | Purpose            |
| --------------- | ---- | ------------------ |
| `team-website`  | 3000 | Main application   |
| `event-website` | 3004 | Event landing page |
| `datathon-blog` | 3001 | Blog               |
| `leaderboard`   | ?    | Standalone app     |

### Docker Support

Both `team-website` and `event-website` have Dockerfiles for containerized deployment.

---

## Issues & Recommendations

### Critical Issues (High Priority)

#### 1. Empty/Unused Package

**Issue:** `apps/docs-nextra/` is empty and unused  
**Impact:** Clutters repository, may confuse developers  
**Recommendation:** **DELETE** entirely  
**Files:** `apps/docs-nextra/package.json`, `apps/docs-nextra/next-env.d.ts`

---

#### 2. Deprecated Code in `port_later/`

**Issue:** Contains code with hardcoded paths and unused templates  
**Impact:** Confusion, potential build errors  
**Recommendation:**

-   Review `port_later/SQL_Game/` - move to appropriate app or delete
-   Delete `port_later/docs-nextra/` if unused

---

#### 3. Test Router in Production

**Issue:** `testRouter` is included in production API router  
**Impact:** Security risk, exposes test endpoints  
**Recommendation:**

-   Remove from production router
-   Or gate behind development environment check

---

#### 4. Commented Code Blocks

**Issue:** Large commented code blocks in `team-website/src/app/page.tsx` (lines 59-80, 42-44, 51-52)  
**Impact:** Code clutter, confusion  
**Recommendation:** Remove commented code (version control has history)

---

### Structural Issues (Medium Priority)

#### 5. Duplicate Components

**Issue:** Many duplicate components between `team-website` and `event-website`  
**Impact:** Maintenance burden, inconsistency risk  
**Recommendation:**

-   Create migration plan to consolidate into `@vanni/ui`
-   Start with clearly identical components (ScrollUp, ScrollToTop, error pages)
-   Review app-specific differences before merging

---

#### 6. App Purpose Confusion

**Issue:** Both `team-website` and `event-website` appear to be event websites  
**Impact:** Unclear architecture, potential redundancy  
**Recommendation:**

-   Document clear distinction:
    -   `team-website`: Full application portal with admin/organizer tools
    -   `event-website`: Public marketing/landing page
-   Or consider merging if serving same purpose

---

#### 7. Standalone Leaderboard App

**Issue:** `leaderboard/` uses different tech stack (Prisma vs Drizzle, NextAuth vs Better Auth)  
**Impact:** Inconsistency, maintenance burden  
**Recommendation:**

-   **Option A:** Migrate to monorepo as `apps/leaderboard` and use shared packages
-   **Option B:** Document decision to keep separate (if different deployment schedule/team)

---

#### 8. Root Package.json

**Issue:** Root `package.json` only contains `google-map-react`  
**Impact:** Unclear purpose, may be unused  
**Recommendation:**

-   Search codebase for `google-map-react` usage
-   If unused, remove
-   If used, move to appropriate app's `package.json`

---

### Optimization Opportunities (Low Priority)

#### 9. Database Migrations

**Issue:** 24+ migration files in `packages/db/drizzle/`  
**Recommendation:** Review and consider squashing older migrations

---

#### 10. Configuration Duplication

**Issue:** Both `team-website` and `event-website` have `components.json` and `utils.ts`  
**Recommendation:**

-   Share `components.json` if using same shadcn setup
-   Move `cn()` utility to shared package if needed

---

#### 11. TODO Comments

**Issue:** Multiple TODO comments throughout codebase  
**Recommendation:**

-   Address or remove TODOs
-   Use issue tracker for tracking instead of code comments

---

## Cleanup Priority Checklist

### Phase 1: Critical Cleanup (Do First)

-   [ ] **Delete `apps/docs-nextra/`** - Empty package
    -   Remove directory: `my-turborepo/apps/docs-nextra/`
-   [ ] **Remove `testRouter` from production** - Security cleanup
    -   Option A: Remove from `packages/api/src/root.ts`
    -   Option B: Gate behind environment check
-   [ ] **Clean up `port_later/` directory**
    -   Review `SQL_Game/` - determine if needed
    -   Delete `port_later/docs-nextra/` if unused
    -   Fix or remove hardcoded paths
-   [ ] **Remove commented code blocks**
    -   Clean up `team-website/src/app/page.tsx` (lines 59-80, 42-44, 51-52)
    -   Search codebase for other large commented blocks

---

### Phase 2: Structural Improvements

-   [ ] **Audit duplicate components**
    -   Create list of truly identical components
    -   Identify components with meaningful differences
-   [ ] **Migrate common components to `@vanni/ui`**
    -   Start with: ScrollUp, ScrollToTop, error pages
    -   Update imports in both apps
-   [ ] **Document app purposes**
    -   Create README in each app explaining purpose
    -   Document relationship between `team-website` and `event-website`
-   [ ] **Verify `google-map-react` usage**
    -   Search codebase
    -   Remove from root or move to appropriate app

---

### Phase 3: Future Optimizations

-   [ ] **Review database migrations**
    -   Audit migration files
    -   Consider squashing if appropriate
-   [ ] **Consolidate configuration files**
    -   Share `components.json` if possible
    -   Move `utils.ts` `cn()` to shared package
-   [ ] **Address TODO comments**
    -   Review and address each TODO
    -   Remove or convert to issues
-   [ ] **Consider leaderboard migration**
    -   Evaluate migrating `leaderboard/` to monorepo
    -   Or document decision to keep separate

---

## Additional Notes

### Code Quality Observations

1. **Type Safety:** Good TypeScript usage throughout
2. **Modern Stack:** Using latest Next.js, React RC versions (ensure stability)
3. **Consistent Patterns:** tRPC patterns are consistent
4. **Documentation:** Could benefit from more inline documentation

### Development Workflow

-   **Package Manager:** PNPM workspace configured correctly
-   **Build System:** Turborepo for efficient builds
-   **Linting/Formatting:** ESLint and Prettier configured
-   **Type Checking:** TypeScript strict mode in use

---

## Questions for Team Discussion

1. **App Purpose:** What is the definitive purpose separation between `team-website` and `event-website`?
2. **Leaderboard:** Should `leaderboard/` be migrated into monorepo or kept separate?
3. **Test Router:** Should test endpoints be completely removed or gated behind environment?
4. **Component Strategy:** Preferred approach for component sharing? `@vanni/ui` expansion or new `@vanni/shared-components`?
5. **Migration Timeline:** When should leaderboard migration happen, if at all?

---

## Conclusion

This repository has a solid foundation with a well-structured monorepo, but there are opportunities for cleanup and optimization. The critical issues should be addressed first to reduce technical debt, followed by structural improvements to reduce duplication and improve maintainability.

**Estimated Cleanup Time:**

-   Phase 1 (Critical): 2-4 hours
-   Phase 2 (Structural): 1-2 days
-   Phase 3 (Optimization): Ongoing

---

## Step 2: Current State Assessment & Next Steps

**Last Updated:** January 2025  
**Purpose:** Track progress on cleanup efforts and identify remaining work based on current repository state.

---

### Completed Cleanup Items ✅

The following cleanup tasks have been successfully completed:

-   [x] **Deleted `apps/docs-nextra/`** - Empty package successfully removed

    -   Directory `my-turborepo/apps/docs-nextra/` has been deleted
    -   No longer cluttering the repository

-   [x] **Migrated `ScrollUp` component** - Component successfully moved to shared package

    -   Component now in `@vanni/ui/src/scroll-up.tsx`
    -   Both `team-website` and `event-website` apps updated to import from `@vanni/ui/scroll-up`
    -   Old `components/Common/ScrollUp.tsx` files removed from both apps

-   [x] **Migrated `SectionTitle` component** - Component successfully moved to shared package

    -   Component now in `@vanni/ui/src/section-title.tsx`
    -   `team-website` app updated to import from `@vanni/ui/section-title`
    -   Old `components/Common/SectionTitle.tsx` files removed from both apps

-   [x] **Removed `Common/` component directories** - Old duplicate component directories cleaned up

    -   `components/Common/` directories removed from both `team-website` and `event-website` apps
    -   Cleaned up duplicate component infrastructure

-   [x] **Created `Breadcrumb` in `@vanni/ui`** - Component available in shared package
    -   Component exists in `@vanni/ui/src/breadcrumb.tsx`
    -   ⚠️ **Needs Verification:** Confirm all imports updated to use `@vanni/ui/breadcrumb`

---

### Remaining Critical Tasks

The following items from Phase 1 still require attention:

#### 1. Remove `testRouter` from Production API

**Status:** ⚠️ **STILL PENDING**

**Current State:**

-   `testRouter` is still included in `packages/api/src/root.ts`
-   Test endpoints are exposed in production API

**Action Required:**

-   Option A: Remove `testRouter` import and usage from `packages/api/src/root.ts`
-   Option B: Gate `testRouter` behind environment check (development only)

**Files to Modify:**

-   `packages/api/src/root.ts` (lines 10, 22)

---

#### 2. Clean Up `port_later/` Directory

**Status:** ⚠️ **STILL PENDING**

**Current State:**

-   `port_later/SQL_Game/` still exists with hardcoded paths to `apps/team-website`
-   `port_later/docs-nextra/` still exists (unused documentation template)

**Action Required:**

-   Review `port_later/SQL_Game/` - determine if code is needed elsewhere or delete
-   Delete `port_later/docs-nextra/` if not being used
-   Fix or remove hardcoded paths in `SQL_Game/page.tsx`

**Files/Directories to Review:**

-   `my-turborepo/port_later/SQL_Game/page.tsx`
-   `my-turborepo/port_later/docs-nextra/` (entire directory)

---

#### 3. Remove Commented Code Blocks

**Status:** ⚠️ **STILL PENDING**

**Current State:**

-   Large commented code blocks still exist in `nextjs/src/app/page.tsx`
-   Lines 59-80: Entire alternative return statement commented out
-   Lines 42-44, 51-52: Commented component imports

**Action Required:**

-   Remove commented code blocks (version control has history)
-   Search codebase for other large commented blocks

**Files to Clean:**

-   `my-turborepo/apps/team-website/src/app/page.tsx`

---

### Component Migration Status

#### Completed Component Migrations ✅

-   ✅ `ScrollUp` - Fully migrated and in use
-   ✅ `SectionTitle` - Fully migrated and in use
-   ⚠️ `Breadcrumb` - Created in `@vanni/ui` but usage needs verification

#### Remaining Component Migrations

The following components still need to be migrated or consolidated:

**High Priority:**

-   [x] **Verify `Breadcrumb` usage** - Ensure all imports updated to `@vanni/ui/breadcrumb`
-   [x] **Migrate `ScrollToTop`** - Exists in both apps, should be in `@vanni/ui`
-   [x] **Migrate `error/page.tsx`** - Exists in both apps, should be in `@vanni/ui`

**Medium Priority:**

-   [ ] **Contact Components** - Review and potentially migrate:
    -   `ContactBackground.tsx`
    -   `NewsLatterBox.tsx`
    -   Review `index.tsx` for differences

**Lower Priority (App-Specific Consideration):**

-   [ ] **UI Component Consolidation** - Consider migrating duplicate UI components:
    -   `button.tsx`, `card.tsx`, `carousel.tsx`
    -   `toast.tsx`, `toaster.tsx`
    -   Note: These may have app-specific customizations to review

**Keep Separate (App-Specific):**

-   ✅ `Footer/index.tsx` - Different implementations, keep separate
-   ✅ `Header/index.tsx` - Different implementations, keep separate
-   ✅ App-specific components (Hero, AboutTeam, etc.) - Correctly kept separate

---

### Next Immediate Steps (Prioritized)

Based on the current state assessment, the following actions should be taken in order:

1.  **Verify Breadcrumb Migration** ⏱️ ~15 minutes

    -   Search codebase for any remaining `Breadcrumb` imports from old locations
    -   Confirm all imports use `@vanni/ui/breadcrumb`
    -   Update any remaining old imports

2.  **Remove Commented Code** ⏱️ ~10 minutes

    -   Clean up commented blocks in `team-website/src/app/page.tsx`
    -   Search for other large commented code blocks
    -   Remove TODO comments that are no longer relevant

3.  **Address Test Router Security** ⏱️ ~30 minutes

    -   Decide on approach: remove entirely or gate behind environment
    -   Implement chosen solution
    -   Test that API still works correctly

4.  **Complete port_later Cleanup** ⏱️ ~1 hour

    -   Review `SQL_Game/` code to determine if it's needed
    -   Move useful code to appropriate location or delete
    -   Delete `port_later/docs-nextra/` if unused
    -   Remove entire `port_later/` directory if empty

5.  **Continue Component Migration** ⏱️ ~2-3 hours

    -   Migrate `ScrollToTop` to `@vanni/ui`
    -   Migrate `error/page.tsx` to `@vanni/ui`
    -   Update imports in both apps
    -   Remove old component files

6.  **Version Alignment** ⏱️ ~1-2 hours
    -   Run `pnpm depcheck` and `pnpm lint:ws` to identify version inconsistencies
    -   Fix any remaining version mismatches
    -   Update template files with correct versions

---

### Updated Phase Status Summary

**Phase 1: Critical Cleanup** - 25% Complete

-   ✅ Deleted empty `apps/docs-nextra/`
-   ❌ Remove `testRouter` from production
-   ❌ Clean up `port_later/` directory
-   ❌ Remove commented code blocks

**Phase 2: Structural Improvements** - 40% Complete

-   ✅ Component migration started (ScrollUp, SectionTitle completed)
-   ⚠️ Component migration in progress (Breadcrumb needs verification)
-   ❌ Complete remaining component migrations
-   ❌ Document app purposes
-   ❌ Verify `google-map-react` usage

**Phase 3: Future Optimizations** - 0% Complete

-   ❌ Review database migrations
-   ❌ Consolidate configuration files
-   ❌ Address TODO comments
-   ❌ Consider leaderboard migration

---

### Recommendations for Continued Progress

1.  **Focus on Security First** - Address `testRouter` exposure before other tasks
2.  **Complete Component Migration** - Finish the migration pattern you've started
3.  **Clean Up Deprecated Code** - Remove `port_later/` to reduce confusion
4.  **Maintain Momentum** - The component migration pattern is working well, continue it

---

_This section will be updated as cleanup progress continues. Last assessment: January 2025._

---

_For questions or clarifications, refer to this document or contact the development team._
