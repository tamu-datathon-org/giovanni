import Image from "next/image";

import Heading from "~/app/challenges/helpers/Heading";

interface prizeSchema {
  name: string;
  img_url?: string;
}
const places = ["1st", "2nd", "3rd", "4th", "5th"];
export default function Prizes(prizes: prizeSchema[]) {
  return (
    <>
      {prizes.map((prize, index) => {
        return (
          <div>
            <Heading>{places[index] + " place: " + prize.name}</Heading>
            {prize.img_url ?? (
              <Image
                width={500}
                height={500}
                src={prize.img_url!}
                alt={"Challenge Prize"}
              />
            )}
          </div>
        );
      })}
    </>
  );
}
