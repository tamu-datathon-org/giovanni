import z from "zod";

import { Application } from "@vanni/db/schema";

export type TableData = typeof Application.$inferSelect & {
  resumeName: string | undefined;
  resumeUrl: string | undefined;
};
