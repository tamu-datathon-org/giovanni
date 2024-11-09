//TODO: This is where all information of a single challenge should be displayed
// import Prize from "~/app/challenges/helpers/Prize";
import Title from "~/app/challenges/helpers/Title";
import Heading from "../helpers/Heading";
import Bold from "../helpers/Bold";
import Paragraph from "../helpers/Paragraph";
import Bullet from "../helpers/Bullet";
import { Button } from "@vanni/ui/button";
import "../../_components/customCss.scss";
import Prizes from "~/app/challenges/helpers/Prizes";

export default function Challenge() {


    return (
        <div className="w-full h-full justify-center items-center p-4 bg-blue-200">

            <div className="bg-white/90 rounded-lg border-4 p-4">

                <a className="px-4 py-3 border-2" href="/challenges">Back</a>

                <Title>
                    Rev's Riddles: Hotel Negotiation Edition
                </Title>

                <Heading>
                    Background
                </Heading>

                <Paragraph>
                    Negotiating is a key skill in many industries, and being able to drive a favorable deal is crucial. In this challenge, participants must negotiate hotel room prices with Reveille, Texas A&M’s mascot. The catch? Reveille is powered by an AI chatbot that becomes more challenging with each round. Can you convince Reveille to lower the price? This challenge encourages creativity in "prompt engineering" to achieve the best deal.
                </Paragraph>

                <Heading>
                    Task
                </Heading>

                <Paragraph>
                    Participants will log into a web app and interact with the AI chatbot, negotiating room prices. Starting with an easy chatbot, the challenge will get tougher as the levels progress. Your goal is to find the right words to convince the chatbot to lower the room price. No coding is required, just strategic thinking and clever communication.
                </Paragraph>

                <Heading>
                    Methods
                </Heading>

                <Bullet items={[
                    "Prompt Engineering: Crafting effective prompts that can convince the chatbot to lower price.",
                    "Negotiation Tactics: Each level will require different negotiation strategies as the chatbot’s responses become more sophisticated.",
                    "Levels of Difficulty: The chatbot becomes more difficult to negotiate with at each level.",
                    "Web-Based Interaction: All interactions are done via a web app, with team logins for tracking."
                ]}
                />

                <Heading>
                    How To Win
                </Heading>
                <Bullet items={[
                    "Lowest Room Price: The team that achieves the lowest negotiated room price will rank the highest",
                    "Limited amount of attempts: Limit submissions ex: 50 per 1hour"
                ]}
                />

                <Heading>
                    Methods
                </Heading>

                <Bullet items={[
                    "Prompt Engineering workshop: Optional tips for crafting effective prompts through a workshop"
                ]}
                />
                <div className="flex items-center justify-center pt-6">
                    <a className="compStyling border border-black bg-[#f5f5f5] text-black hover:bg-[#e4e3e4] hover:text-black w-1/4 text-center" href="https://fortnite.challenges.tamudatathon.com/" target="_blank">Go to Challenge</a>
                </div>

                <Prizes
                    prizes={[
                        { name: "Owala WaterBottle", img_url: "/prizes/owala_bottle.webp" },
                        { name: "Apple AirTag", img_url: "/prizes/apple_air_tag.jpg" },
                        { name: "313 Anker Wireless Charger" , img_url: "/prizes/wireless_charger.jpg" },
                    ]}
                />
            </div>
        </div>
    );
}
