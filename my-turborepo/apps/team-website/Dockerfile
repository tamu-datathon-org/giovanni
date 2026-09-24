FROM node:22-alpine AS base
# Enable pnpm via corepack so the version pinned in the root package.json
# ("packageManager": "pnpm@...") is used. libc6-compat is needed by some
# native deps (e.g. sharp) on alpine, both at build and runtime.
RUN corepack enable
RUN apk add --no-cache libc6-compat
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NEXT_TELEMETRY_DISABLED=1

# Fetch AWS's IAM Roles Anywhere credential helper. No secrets in this image
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

# Produce an isolated, pruned subset of the monorepo for this app.
FROM base AS builder
WORKDIR /app
COPY . .
RUN pnpm dlx turbo@2.4.4 prune @vanni/team-website --docker

# Install dependencies and build the app.
FROM base AS installer
WORKDIR /app

# Native build toolchain for node-gyp; lives only in this throwaway stage.
RUN apk add --no-cache python3 make g++

# Install dependencies first (changes less often -> better layer caching).
COPY --from=builder /app/out/json/ .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# Build the project from the pruned full source.
COPY --from=builder /app/out/full/ .

ARG TURBO_TEAM
ARG TURBO_TOKEN
ENV TURBO_TEAM=$TURBO_TEAM
ENV TURBO_TOKEN=$TURBO_TOKEN
ENV SKIP_ENV_VALIDATION=true

RUN pnpm exec turbo run build --filter=@vanni/team-website

# Minimal runtime image.
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Don't run production as root.
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs
USER nextjs

# credential_process reads its cert/key/config from here at runtime; Coolify
# mounts the actual files into this directory (see infra runbook) — nothing
# sensitive is copied into the image.
ENV AWS_CONFIG_FILE=/app/.aws/config
COPY --from=awscreds /usr/local/bin/aws_signing_helper /usr/local/bin/aws_signing_helper

# Leverage Next.js output file tracing (standalone) to keep the image small.
COPY --from=installer --chown=nextjs:nodejs /app/apps/team-website/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/team-website/.next/static ./apps/team-website/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/team-website/public ./apps/team-website/public

EXPOSE 3000
CMD ["node", "apps/team-website/server.js"]
