"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
/* eslint-disable no-restricted-properties */
var env_nextjs_1 = require("@t3-oss/env-nextjs");
var zod_1 = require("zod");
exports.env = (0, env_nextjs_1.createEnv)({
    server: {
        AUTH_DISCORD_ID: zod_1.z.string().min(1),
        AUTH_DISCORD_SECRET: zod_1.z.string().min(1),
        AUTH_AUTH0_ID: zod_1.z.string().min(1),
        AUTH_AUTH0_SECRET: zod_1.z.string().min(1),
        AUTH_AUTH0_DOMAIN: zod_1.z.string().url(),
        AUTH_SECRET: process.env.NODE_ENV === "production"
            ? zod_1.z.string().min(1)
            : zod_1.z.string().min(1).optional(),
    },
    client: {},
    experimental__runtimeEnv: {},
    skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
});
