import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

const schema = z.object({
    teamId: z.number(),
    teamName: z.string(),
    points: z.number(),
    rank: z.number()
})

export const postRouter = createTRPCRouter({
    getTopThree: protectedProcedure
        .query(() => {

            //TODO get top3 from array of top 10 that is in order
            const topThree = getTopLeaderboard(3)

            return {
                topThree
            };
        }),

    scoreDiff: publicProcedure
        .input(schema)
        .query(async ({input}) => {

            // RETURN TEAM AHEAD TEAM BEHIND POINT DIFF
            const teams = await getAdjacentTeams(input.teamId)
            const teamAhead = teams[2]
            const curTeam = teams[1]
            const teamBehind = teams[0]

            return {
                teamAhead,
                curTeam,
                teamBehind
            };
        })

});

interface Team {
    id: number;
    name: string;
    score: number;
    rank: number;
}

async function getTopLeaderboard(count: number) {
    const response = await fetch(`${"http..."}/api/v1/scoreboard/top/${count}`,
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${process.env.CTFD_API_KEY}`
        },
    });
    //returned as {"1" : {id:...}, "2": {id:...}, "3": {id:...}, etc.}
    const data = await response.json();
    const teams: Team[] = new Array(data.length);
    for (let i = 1; i < data.length + 1; i++) {
        teams[i] = {
            id: data[i as unknown as string].id,
            name: data[i as unknown as string].name,
            score: data[i as unknown as string].score,
            rank: i,
        };
    }

    return teams;
    // get_scoreboard_details
    // get_team_public
    // get_team_public_awards
    // query teams from all -> get the 3 based on the placement
}

async function getAdjacentTeams(teamId: number) {
    const teamResponse = await fetch(`https://tamudatathon.ctfd.io/api/v1/teams/${teamId}`, 
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${process.env.CTFD_API_KEY}`
        },
    });
    const teamData = await teamResponse.json();
    let placement = teamData.place as string;
    //placement is returns as 1st, 2nd, 3rd, 4th, etc.
    let count = (placement).substring(0, placement.search(/[a-zA-z]/)) as unknown as number;
    console.log(count);

    const registeredResponse = await fetch(`https://tamudatathon.ctfd.io/api/v1/statistics/teams`,
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${process.env.CTFD_API_KEY}`
        },
    });
    //returned as registered: number
    const registeredData = await registeredResponse.json();
    let totalRegistered = registeredData.registered as number;

    const scoreboardResponse = await fetch(`https://tamudatathon.ctfd.io/api/v1/scoreboard/top/${count + 1}`,
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${process.env.CTFD_API_KEY}`
        },
    });
    //returned a bunch of objects {"1" : {id:...}, "2": {id:...}, "3": {id:...}, etc.}
    const scoreboardData = await scoreboardResponse.json();

    //get the 3 teams based on the placement
    const teams: (Team | null)[] = new Array(3);
    let lowerBound = count - 1 as unknown as string;
    let upperBound = count + 1 as unknown as string;
    if(count == 1) {
        teams[0] = null;
    } else {
        teams[0] = {
            id: scoreboardData[lowerBound].id,
            name: scoreboardData[lowerBound].name,
            score: scoreboardData[lowerBound].score,
            rank: count - 1,
        };
    }

    teams[1] = {
        id: teamData.id,
        name: teamData.name,
        score: teamData.score,
        rank: count,
    };

    if(count == totalRegistered) {
        teams[2] = null;
    } else {
        teams[2] = {
            id: scoreboardData[upperBound].id,
            name: scoreboardData[upperBound].name,
            score: scoreboardData[upperBound].score,
            rank: count + 1,
        };
    }
    return teams;
}