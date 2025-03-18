FROM node:22-alpine AS base

FROM base AS builder
RUN npm install -g pnpm
RUN apk add --no-cache libc6-compat
RUN apk update

ENV PNPM_HOME=/app/.pnpm
ENV PATH=$PNPM_HOME:$PATH

# Set working directory
WORKDIR /app

# Replace <your-major-version> with the major version installed in your repository. For example:
# RUN yarn global add turbo@^2
RUN pnpm i -g turbo@^2.0.12
COPY . .

# Generate a partial monorepo with a pruned lockfile for a target workspace.
# Assuming "web" is the name entered in the project's package.json: { name: "web" }
RUN turbo prune @vanni/event-website --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN npm install -g pnpm
RUN apk update
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache python3
RUN apk --no-cache add build-base
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN pnpm install

# Build the project
ARG TURBO_TEAM
ENV TURBO_TEAM=$TURBO_TEAM

ARG TURBO_TOKEN
ENV TURBO_TOKEN=$TURBO_TOKEN

COPY --from=builder /app/out/full/ .
RUN echo "SKIP_ENV_VALIDATION=true" > .env
RUN pnpm turbo run build
RUN rm .env

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 event-website
USER event-website

# Automatically leverage output traces to reduce image size
# https://event-website.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=event-website:nodejs /app/apps/event-website2/.next/standalone ./
COPY --from=installer --chown=event-website:nodejs /app/apps/event-website2/.next/static ./apps/event-website2/.next/static
COPY --from=installer --chown=event-website:nodejs /app/apps/event-website2/public ./apps/event-website2/public

CMD node apps/event-website2/server.js
