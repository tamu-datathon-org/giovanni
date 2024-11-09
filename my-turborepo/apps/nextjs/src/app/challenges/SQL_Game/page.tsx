//TODO: This is where all information of a single challenge should be displayed
// import Prize from "~/app/challenges/helpers/Prize";
import Title from "~/app/challenges/helpers/Title";
import Heading from "../helpers/Heading";
import Bold from "../helpers/Bold";
import Paragraph from "../helpers/Paragraph";
import Bullet from "../helpers/Bullet";
import { Button } from "@vanni/ui/button";
import "../../_components/customCss.scss";
import Link from "next/link";

export default function Challenge() {


    return (
        <div className="w-full h-full justify-center items-center p-4 bg-blue-200">

            <div className="bg-white/90 rounded-lg border-4 p-4">

                <Title>
                    Time-Traveling Adventure
                </Title>
                <Paragraph>
                Travel back to 1999 and prevent the <Link href={'Y2K digital apocalypse!'}>Y2K digital apocalypse!</Link> You are a data scientist from the year 2050, tasked with fixing critical data errors that threaten to plunge the world into chaos.
                </Paragraph>

                <Heading>
                    How it works:
                </Heading>
                <Bullet items={[
                    "Choose Your Weapon: Select your preferred tool, SQL or Python (pandas), to tackle time-bending data challenges.",
                    "Level Up: Progress through a series of increasingly complex levels, each set in a different sector of the 1999 digital landscape.",
                    "Earn Points: As you fix errors and save the day, you'll earn points and advance through time.",
                    "Switch Perspectives: Want to try a different approach? Replay levels using the alternative tool to optimize your time-traveling efficiency."
                ]}
                />

                <Heading>
                    The Winning Team
                </Heading>

                <Paragraph>
                    The team that accumulates the most points by fixing the most critical data errors will be hailed as the ultimate time-traveling data hero and receive a special prize. Remember, you can earn points for completing tasks using either SQL or Python, so don't limit yourself to just one tool!
                </Paragraph>

                <Heading>
                    Helpful Resources
                </Heading>

                <Paragraph>
                If you're new to pandas or SQL, here are some excellent resources to help you get started:

                Pandas Documentation: https://pandas.pydata.org/docs/
                SQL Tutorial: https://www.w3schools.com/sql/
                DataCamp: https://www.datacamp.com/

                With these resources and our time-traveling adventure, you'll be well-equipped to save the world from digital doom! Good Luck!
                </Paragraph>

                <Bullet items={[
                    "Prompt Engineering: Crafting effective prompts that can convince the chatbot to lower rent.",
                    "Negotiation Tactics: Each level will require different negotiation strategies as the chatbot’s responses become more sophisticated.",
                    "Levels of Difficulty: The chatbot becomes more difficult to negotiate with at each level.",
                    "Web-Based Interaction: All interactions are done via a web app, with team logins for tracking."
                ]}
                />
            </div>
        </div>
    );
}
