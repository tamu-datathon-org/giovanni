# create-t3-turbo

> **Note**
> Due to high demand, this repo now uses the `app` directory with some new experimental features. If you want to use the more traditional `pages` router, [check out the repo before the update](https://github.com/t3-oss/create-t3-turbo/tree/414aff131ca124573e721f3779df3edb64989fd4).

> **Note**
> OAuth deployments are now working for preview deployments. Read [deployment guide](https://github.com/t3-oss/create-t3-turbo#auth-proxy) and [check out the source](./apps/auth-proxy) to learn more!

## Installation

There are two ways of initializing an app using the `create-t3-turbo` starter. You can either use this repository as a template:

![use-as-template](https://github.com/t3-oss/create-t3-turbo/assets/51714798/bb6c2e5d-d8b6-416e-aeb3-b3e50e2ca994)

or use Turbo's CLI to init your project (use PNPM as package manager):

```bash
npx create-turbo@latest -e https://github.com/t3-oss/create-t3-turbo
```

## About

Ever wondered how to migrate your T3 application into a monorepo? Stop right here! This is the perfect starter repo to get you running with the perfect stack!

It uses [Turborepo](https://turborepo.org) and contains:

```text
.github
  └─ workflows
        └─ CI with pnpm cache setup
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  ├─ auth-proxy
  |   ├─ Nitro server to proxy OAuth requests in preview deployments
  |   └─ Uses Auth.js Core
  ├─ expo
  |   ├─ Expo SDK 51
  |   ├─ React Native using React 18
  |   ├─ Navigation using Expo Router
  |   ├─ Tailwind using NativeWind
  |   └─ Typesafe API calls using tRPC
  └─ next.js
      ├─ Next.js 14
      ├─ React 18
      ├─ Tailwind CSS
      └─ E2E Typesafe API Server & Client
packages
  ├─ api
  |   └─ tRPC v11 router definition
  ├─ auth
  |   └─ Authentication using next-auth. **NOTE: Only for Next.js app, not Expo**
  ├─ db
  |   └─ Typesafe db calls using Drizzle & Supabase
  └─ ui
      └─ Start of a UI package for the webapp using shadcn-ui
tooling
  ├─ eslint
  |   └─ shared, fine-grained, eslint presets
  ├─ prettier
  |   └─ shared prettier configuration
  ├─ tailwind
  |   └─ shared tailwind configuration
  └─ typescript
      └─ shared tsconfig you can extend from
```

> In this template, we use `@vanni` as a placeholder for package names. As a user, you might want to replace it with your own organization or project name. You can use find-and-replace to change all the instances of `@vanni` to something like `@my-company` or `@project-name`.

## Quick Start

> **Note**
> The [db](./packages/db) package is preconfigured to use Supabase and is **edge-bound** with the [Vercel Postgres](https://github.com/vercel/storage/tree/main/packages/postgres) driver. If you're using something else, make the necessary modifications to the [schema](./packages/db/src/schema) as well as the [client](./packages/db/src/index.ts) and the [drizzle config](./packages/db/drizzle.config.ts). If you want to switch to non-edge database driver, remove `export const runtime = "edge";` [from all pages and api routes](https://github.com/t3-oss/create-t3-turbo/issues/634#issuecomment-1730240214).

To get it running, follow the steps below:

### 1. Setup dependencies

```bash
# Install dependencies
pnpm i

# Configure environment variables
# There is an `.env.example` in the root directory you can use for reference
cp .env.example .env

# Push the Drizzle schema to the database
pnpm db:push
```


### 3b. When it's time to add a new package

To add a new package, simply run `pnpm turbo gen init` in the monorepo root. This will prompt you for a package name as well as if you want to install any dependencies to the new package (of course you can also do this yourself later).

The generator sets up the `package.json`, `tsconfig.json` and a `index.ts`, as well as configures all the necessary configurations for tooling around your package such as formatting, linting and typechecking. When the package is created, you're ready to go build out the package.

## FAQ

### Does the starter include Solito?

No. Solito will not be included in this repo. It is a great tool if you want to share code between your Next.js and Expo app. However, the main purpose of this repo is not the integration between Next.js and Expo — it's the code splitting of your T3 App into a monorepo. The Expo app is just a bonus example of how you can utilize the monorepo with multiple apps but can just as well be any app such as Vite, Electron, etc.

Integrating Solito into this repo isn't hard, and there are a few [official templates](https://github.com/nandorojo/solito/tree/master/example-monorepos) by the creators of Solito that you can use as a reference.

### What auth solution should I use instead of Next-Auth.js for Expo?

I've left this kind of open for you to decide. Some options are [Clerk](https://clerk.dev), [Supabase Auth](https://supabase.com/docs/guides/auth), [Firebase Auth](https://firebase.google.com/docs/auth/) or [Auth0](https://auth0.com/docs). Note that if you're dropping the Expo app for something more "browser-like", you can still use Next-Auth.js for those. [See an example in a Plasmo Chrome Extension here](https://github.com/t3-oss/create-t3-turbo/tree/chrome/apps/chrome).

The Clerk.dev team even made an [official template repository](https://github.com/clerkinc/t3-turbo-and-clerk) integrating Clerk.dev with this repo.

During Launch Week 7, Supabase [announced their fork](https://supabase.com/blog/launch-week-7-community-highlights#t3-turbo-x-supabase) of this repo integrating it with their newly announced auth improvements. You can check it out [here](https://github.com/supabase-community/create-t3-turbo).

### Does this pattern leak backend code to my client applications?

No, it does not. The `api` package should only be a production dependency in the Next.js application where it's served. The Expo app, and all other apps you may add in the future, should only add the `api` package as a dev dependency. This lets you have full typesafety in your client applications, while keeping your backend code safe.

If you need to share runtime code between the client and server, such as input validation schemas, you can create a separate `shared` package for this and import it on both sides.

## Deployment

### Next.js

#### Prerequisites

> **Note**
> Please note that the Next.js application with tRPC must be deployed in order for the Expo app to communicate with the server in a production environment.

#### Deploy to Vercel

Let's deploy the Next.js application to [Vercel](https://vercel.com). If you've never deployed a Turborepo app there, don't worry, the steps are quite straightforward. You can also read the [official Turborepo guide](https://vercel.com/docs/concepts/monorepos/turborepo) on deploying to Vercel.

1. Create a new project on Vercel, select the `apps/nextjs` folder as the root directory. Vercel's zero-config system should handle all configurations for you.

2. Add your `DATABASE_URL` environment variable.

3. Done! Your app should successfully deploy. Assign your domain and use that instead of `localhost` for the `url` in the Expo app so that your Expo app can communicate with your backend when you are not in development.

## References

The stack originates from [create-t3-app](https://github.com/t3-oss/create-t3-app).

A [blog post](https://jumr.dev/blog/t3-turbo) where I wrote how to migrate a T3 app into this.
