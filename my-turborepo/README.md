# my-turborepo

This is the monorepo root — all TAMU Datathon apps and shared packages live here.

**New here? Read [`../README.md`](../README.md)** for setup, architecture, and deployment.

Quick reference (run from this directory):

```bash
pnpm install    # install everything
pnpm dev        # run all three sites
pnpm typecheck  # check types before pushing
```

The structure originates from [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo), which is useful background for the general layout — but our auth, database, and deployment setup have all diverged from it. Trust `../README.md` and the source over upstream docs.
