"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.signIn = exports.auth = exports.POST = exports.GET = void 0;
var react_1 = require("react");
var next_auth_1 = require("next-auth");
var config_1 = require("./config");
var _a = (0, next_auth_1.default)(config_1.authConfig), _b = _a.handlers, GET = _b.GET, POST = _b.POST, defaultAuth = _a.auth, signIn = _a.signIn, signOut = _a.signOut;
exports.GET = GET;
exports.POST = POST;
exports.signIn = signIn;
exports.signOut = signOut;
/**
 * This is the main way to get session data for your RSCs.
 * This will de-duplicate all calls to next-auth's default `auth()` function and only call it once per request
 */
var auth = (0, react_1.cache)(defaultAuth);
exports.auth = auth;
