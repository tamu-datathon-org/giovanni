import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const schema = z.object({
  teamId: z.number(),
  teamName: z.string(),
  points: z.number(),
  rank: z.number(),
});

export const teamRouter = createTRPCRouter({
  getTopThree: publicProcedure.query(async () => {
    //TODO get top3 from array of top 10 that is in order
    const topThree = await getTopLeaderboard(3);

    return topThree;
  }),

  scoreDiff: publicProcedure.input(schema).query(async ({ input }) => {
    // RETURN TEAM AHEAD TEAM BEHIND POINT DIFF
    const teams = await getAdjacentTeams(input.teamId);
    const teamAhead = teams[2];
    const curTeam = teams[1];
    const teamBehind = teams[0];

    return {
      teamAhead,
      curTeam,
      teamBehind,
    };
  }),
});

export interface Team {
  id: number;
  name: string;
  score: number;
  rank: number;
}

interface DataTeam {
  id: number;
  account_url: string;
  name: string;
  score: number;
  bracket_id: number | null;
  bracket_name: string | null;
  solves: DataSolve[];
}

interface DataSolve {
  challenge_id: number;
  account_id: number;
  team_id: number;
  user_id: number;
  value: number;
  date: string;
}

interface DataIndividualTeam {
  secret: null | string;
  hidden: boolean;
  created: string;
  name: string;
  country: null | string;
  members: number[];
  email: null | string;
  bracket_id: null | string;
  banned: boolean;
  website: null | string;
  captain_id: number;
  id: number;
  fields: never[];
  affiliation: null | string;
  oauth_id: null | string;
  place: string;
  score: number;
}

interface DataTeamStatistics {
  registered: number;
}

async function getTopLeaderboard(count: number) {
  const response = await fetch(
    `https://tamudatathon.ctfd.io/api/v1/scoreboard/top/${count}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.CTFD_API_KEY}`,
      },
    },
  );
  //returned as {"1" : {id:...}, "2": {id:...}, "3": {id:...}, etc.}
  const teams: Team[] = [];
  // let i = 0;
  const data = (await response.json());
  if (data["success"] === false) return [] 

  const res = data["data"];
  console.log(res)
  for (const key in res) {
    teams.push({
    id: res[key]!.id,
    name: res[key]!.name,
    score: res[key]!.score,
    rank: parseInt(key),
  });
}
  // i++;


  // console.log(teams)

  return teams;
  // get_scoreboard_details
  // get_team_public
  // get_team_public_awards
  // query teams from all -> get the 3 based on the placement
}

async function getAdjacentTeams(teamId: number) {
  const teamResponse = await fetch(
    `https://tamudatathon.ctfd.io/api/v1/teams/${teamId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.CTFD_API_KEY}`,
      },
    },
  );
  const teamData = (await teamResponse.json()) as DataIndividualTeam;
  const placement = teamData.place;
  //placement is returns as 1st, 2nd, 3rd, 4th, etc.
  const count = placement.substring(
    0,
    placement.search(/[a-zA-z]/),
  ) as unknown as number;
  console.log(count);

  const registeredResponse = await fetch(
    `https://tamudatathon.ctfd.io/api/v1/statistics/teams`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.CTFD_API_KEY}`,
      },
    },
  );
  //returned as registered: number
  const registeredData =
    (await registeredResponse.json()) as DataTeamStatistics;
  const totalRegistered = registeredData.registered;

  const scoreboardResponse = await fetch(
    `https://tamudatathon.ctfd.io/api/v1/scoreboard/top/${count + 1}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.CTFD_API_KEY}`,
      },
    },
  );
  //returned a bunch of objects {"1" : {id:...}, "2": {id:...}, "3": {id:...}, etc.}
  const scoreboardData = (await scoreboardResponse.json());

  //get the 3 teams based on the placement
  const teams: (Team | null)[] = new Array<Team | null>(3);
  const lowerBound = (count - 1) as unknown as string;
  const upperBound = (count + 1) as unknown as string;
  if (count == 1) {
    teams[0] = null;
  } else {
    if (
      scoreboardData[lowerBound] !== null &&
      scoreboardData[lowerBound] !== undefined
    ) {
      teams[0] = {

        id: scoreboardData[lowerBound]!.id,

        name: scoreboardData[lowerBound]!.name,

        score: scoreboardData[lowerBound]!.score,
        rank: count - 1,
      };
    }
  }

  teams[1] = {
    id: teamData.id,
    name: teamData.name,
    score: teamData.score,
    rank: count,
  };

  if (count == totalRegistered) {
    teams[2] = null;
  } else {
    if (
      scoreboardData[upperBound] !== null &&
      scoreboardData[upperBound] !== undefined
    ) {
      teams[2] = {
        id: scoreboardData[upperBound]!.id,
        name: scoreboardData[upperBound]!.name,
        score: scoreboardData[upperBound]!.score,
        rank: count + 1,
      };
    }
  }
  return teams;
}
