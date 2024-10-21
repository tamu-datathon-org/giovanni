import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import type { EdgelessRouter } from "./root";
import { createCallerFactory, createTRPCContext } from "../trpc";
import { edgelessRouter } from "./root";

/**
 * Create a server-side caller for the tRPC API
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
const createCaller = createCallerFactory(edgelessRouter);

/**
 * Inference helpers for input types
 * @example
 * type PostByIdInput = RouterInputs['post']['byId']
 *      ^? { id: number }
 **/
type RouterInputs = inferRouterInputs<EdgelessRouter>;

/**
 * Inference helpers for output types
 * @example
 * type AllPostsOutput = RouterOutputs['post']['all']
 *      ^? Post[]
 **/
type RouterOutputs = inferRouterOutputs<EdgelessRouter>;

export { createTRPCContext, edgelessRouter, createCaller };
export type { EdgelessRouter, RouterInputs, RouterOutputs };
