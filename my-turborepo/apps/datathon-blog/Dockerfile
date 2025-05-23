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
RUN turbo prune @vanni/datathon-blog --docker

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
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/datathon-blog/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/datathon-blog/.next/static ./apps/datathon-blog/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/datathon-blog/public ./apps/datathon-blog/public

CMD node apps/datathon-blog/server.js
