import { env } from "~/env";

/**
 * The event this site takes applications for. Lives outside the client form
 * file so server components and route handlers can import the real value.
 */
export const EVENT_NAME = env.NEXT_PUBLIC_EVENT_NAME;
