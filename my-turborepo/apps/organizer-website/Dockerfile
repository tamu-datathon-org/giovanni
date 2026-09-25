# syntax=docker/dockerfile:1
#
# Production image for @vanni/organizer-website (TAMU Datathon organizer site).
#
# Build context MUST be the monorepo root -- `turbo prune` needs the whole
# workspace and the root pnpm-lock.yaml.
#
#   docker build -f apps/organizer-website/Dockerfile -t organizer-website .
#
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NEXT_TELEMETRY_DISABLED=1
RUN apk add --no-cache libc6-compat && corepack enable

# ---------------------------------------------------------------------------
# 1. Prune the monorepo down to just organizer-website and its workspace deps
#    (@vanni/api, @vanni/auth, @vanni/db, @vanni/ui, @vanni/validators + tooling)
# ---------------------------------------------------------------------------
FROM base AS pruner
WORKDIR /app
COPY . .
RUN pnpm dlx turbo@^2.4.4 prune @vanni/organizer-website --docker

# ---------------------------------------------------------------------------
# 2. Install dependencies from the pruned lockfile (cached until deps change)
# ---------------------------------------------------------------------------
FROM base AS installer
WORKDIR /app
COPY --from=pruner /app/out/json/ .
# The root `postinstall` runs `pnpm dlx sherif` (a workspace linter) which needs
# network access and adds nothing to a production build -- drop it, then install
# with scripts disabled and rebuild only the packages that genuinely need them.
RUN node -e "const f='package.json',p=require('./'+f);delete p.scripts.postinstall;require('fs').writeFileSync(f,JSON.stringify(p,null,2))" \
 && pnpm install --frozen-lockfile --ignore-scripts \
 && pnpm rebuild sharp esbuild

# ---------------------------------------------------------------------------
# 3. Build only the organizer-website package
# ---------------------------------------------------------------------------
FROM installer AS builder
WORKDIR /app
COPY --from=pruner /app/out/full/ .

# NEXT_PUBLIC_* vars are inlined into the client bundle at build time, so they
# have to be present now -- setting them at runtime in Coolify has no effect.
ARG NEXT_PUBLIC_EVENT_NAME="Datathon"
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID=""
ARG NEXT_PUBLIC_DRIVE_FOLDER_ID=""
ARG NEXT_PUBLIC_DRIVE_FOLDER_NAME=""
ARG NEXT_PUBLIC_GOOGLE_SHEET_API_URL=""
ARG NEXT_PUBLIC_ENV="production"

# The package's `build` script is `dotenv -e ../../.env -- next build`, so a
# root .env must exist. Server-side secrets are NOT baked in: they are read from
# the real environment at runtime, so validation is skipped for the build.
# Values are quoted because some legitimately contain spaces (e.g. the Drive
# folder name "Email Generation"); dotenv strips the surrounding quotes.
RUN printf '%s\n' \
      'SKIP_ENV_VALIDATION=true' \
      "NEXT_PUBLIC_EVENT_NAME=\"${NEXT_PUBLIC_EVENT_NAME}\"" \
      "NEXT_PUBLIC_GOOGLE_CLIENT_ID=\"${NEXT_PUBLIC_GOOGLE_CLIENT_ID}\"" \
      "NEXT_PUBLIC_DRIVE_FOLDER_ID=\"${NEXT_PUBLIC_DRIVE_FOLDER_ID}\"" \
      "NEXT_PUBLIC_DRIVE_FOLDER_NAME=\"${NEXT_PUBLIC_DRIVE_FOLDER_NAME}\"" \
      "NEXT_PUBLIC_GOOGLE_SHEET_API_URL=\"${NEXT_PUBLIC_GOOGLE_SHEET_API_URL}\"" \
      "NEXT_PUBLIC_ENV=\"${NEXT_PUBLIC_ENV}\"" \
      > .env \
 && pnpm turbo run build --filter=@vanni/organizer-website \
 && rm -f .env

FROM base AS awscreds
ARG TARGETARCH
RUN apk add --no-cache curl
RUN set -eux; \
    case "$TARGETARCH" in \
      amd64) ARCH_PATH="X86_64" ; SHA=beec9ed1c492d93db809890f16713e3556353294b823c2184ad4e891f1b2b54d ;; \
      arm64) ARCH_PATH="Aarch64" ; SHA=3d131aa888cd56da446f9c6bb460b1f0569f6c7edc74eae6193a2fe3928883ba ;; \
      *) echo "unsupported TARGETARCH: $TARGETARCH" >&2; exit 1 ;; \
    esac; \
    curl -sSL -o /usr/local/bin/aws_signing_helper \
      "https://rolesanywhere.amazonaws.com/releases/1.8.5/${ARCH_PATH}/Linux/Amzn2023/aws_signing_helper"; \
    echo "${SHA}  /usr/local/bin/aws_signing_helper" | sha256sum -c -; \
    chmod +x /usr/local/bin/aws_signing_helper

# ---------------------------------------------------------------------------
# 5. Minimal runtime image (Next.js standalone output)
# ---------------------------------------------------------------------------
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# libc6-compat is also what lets the glibc-built aws_signing_helper run on alpine.
RUN apk add --no-cache libc6-compat \
 && addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# The AWS SDK's credential_process reads its cert/key/config from /app/.aws at
# runtime; Coolify mounts the actual files there.
ENV AWS_CONFIG_FILE=/app/.aws/config
COPY --from=awscreds /usr/local/bin/aws_signing_helper /usr/local/bin/aws_signing_helper

COPY --from=builder --chown=nextjs:nodejs /app/apps/organizer-website/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/organizer-website/.next/static ./apps/organizer-website/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/organizer-website/public ./apps/organizer-website/public

USER nextjs
EXPOSE 3000

CMD ["node", "apps/organizer-website/server.js"]
