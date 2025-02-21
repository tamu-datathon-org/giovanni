"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = void 0;
var drizzle_adapter_1 = require("@auth/drizzle-adapter");
var auth0_1 = require("next-auth/providers/auth0");
var discord_1 = require("next-auth/providers/discord");
var client_1 = require("@vanni/db/client");
var schema_1 = require("@vanni/db/schema");
var env_1 = require("../env");
exports.authConfig = {
    adapter: (0, drizzle_adapter_1.DrizzleAdapter)(client_1.db, {
        usersTable: schema_1.User,
        accountsTable: schema_1.Account,
        sessionsTable: schema_1.Session,
    }),
    providers: [
        discord_1.default,
        (0, auth0_1.default)({
            clientId: env_1.env.AUTH_AUTH0_ID,
            clientSecret: env_1.env.AUTH_AUTH0_SECRET,
            issuer: env_1.env.AUTH_AUTH0_DOMAIN,
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        session: function (opts) {
            if (!("user" in opts))
                throw "unreachable with session strategy";
            return __assign(__assign({}, opts.session), { user: __assign(__assign({}, opts.session.user), { id: opts.user.id }) });
        },
    },
};
