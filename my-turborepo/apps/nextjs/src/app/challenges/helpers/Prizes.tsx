import Image from "next/image";

import Heading from "~/app/challenges/helpers/Heading";

interface prizeSchema {
  name: string;
  img_url?: string;
}
const places = ["1st", "2nd", "3rd", "4th", "5th"];
export default function Prizes({ prizes }: { prizes: prizeSchema[] }) {
  return (
    <div className="flex flex-row w-full gap-4">
      {prizes.map((prize, index) => {
        return (
          <div className="flex flex-col">
            <Heading>{places[index] + " place: " + prize.name}</Heading>
            {prize.img_url && (
              <Image
                width={300}
                height={300}
                src={prize.img_url}
                alt={"Challenge Prize"}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
