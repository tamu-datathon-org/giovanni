import Link from "next/link";

import Title from "~/app/challenges/helpers/Title";
import Bold from "../helpers/Bold";
import Bullet from "../helpers/Bullet";
import Heading from "../helpers/Heading";
import Paragraph from "../helpers/Paragraph";

export default function CapitalOnePage() {
  return (
    <div className="h-full w-full justify-center bg-blue-200 p-4">
      <div className="rounded-lg border-4 bg-white/90 p-4">
        <a className="border-2 px-4 py-3" href="/challenges">
          Back
        </a>

        <Title>Capital One Challenge</Title>

        <Heading>Description</Heading>
        <Paragraph>
          At Capital One, we are building the bank of the future. We recognized
          early on that winners in banking will be great tech companies with the
          risk management skills of a leading bank. Along the journey of our
          tech transformation, we went all-in on the public cloud, invested in
          modern architecture standards (microservices, rest APIs, open source)
          and created a real-time streaming ecosystem for big data. Our track is
          The Best Financial Hack! This is your chance to change the game in
          fintech. Whether it's an innovative payment solution, helping
          consumers shop smarter, making financing more accessible, or a
          creative way to improve financial literacy, we want to see your
          boldest ideas in action. Judging will be based on the project's
          creativity, complexity, and completeness.
        </Paragraph>

        <Heading>Prizes</Heading>
        <Paragraph>
          <Bullet
            items={["$250 Amazon Gift Card for each member 0f first place"]}
          />
        </Paragraph>
      </div>
    </div>
  );
}
