import { Application } from "@vanni/db/schema";
import z from "zod";

export type TableData = typeof Application.$inferSelect & {
    resumeName: string | undefined;
    resumeUrl: string | undefined;
};
