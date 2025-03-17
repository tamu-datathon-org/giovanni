import Image from "next/image";

import Heading from "~/app/challenges/helpers/Heading";

interface prizeSchema {
  name: string;
  img_url?: string;
}

const places = ["1st", "2nd", "3rd", "4th", "5th"];

export default function Prizes({ prizes }: { prizes: prizeSchema[] }) {
  return (
    <div className="flex w-full flex-row items-stretch justify-between p-10 text-center">
      {prizes.map((prize, index) => {
        return (
          <div
            key={index}
            className="flex w-full flex-col items-center justify-center text-center"
          >
            <Heading className="z-50 -m-1 flex w-full items-center justify-center text-center font-normal">
              {places[index] + " place: " + prize.name}
            </Heading>
            <div className="flex w-full flex-grow items-center justify-center px-2">
              {prize.img_url && (
                <Image
                  width={300}
                  height={300}
                  src={prize.img_url}
                  alt={"Challenge Prize"}
                  className="max-h-full max-w-full object-contain"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
