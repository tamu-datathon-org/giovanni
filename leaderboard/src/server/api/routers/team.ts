import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

const schema = z.object({
    teamId: z.string(),
    points: z.number(),
    rank: z.number()
})

export const postRouter = createTRPCRouter({
    getTopThree: protectedProcedure
        .input(z.array(schema))
        .query(({input}) => {

            //TODO get top3 from array of top 10 that is in order
            return {
                topThree: input.slice(0,3)
            };
        }),

    scoreDiff: publicProcedure
        .input(z.array(schema))
        .query(({input}) => {

            return {
                // [team behind, team, team ahead, scores of main team, scores of team behind, scores of team ahead]
                teamBehind: input[0],
                teamAhead: input[2],
                diffAhead: input[5] - input[3],
                diffBehind: input[3] - input[4],
            };
        })

})