import Image from "next/image";
import Heading from "~/app/challenges/helpers/Heading";

interface prizeSchema {
  name: string;
  img_url?: string;
}

const places = ["1st", "2nd", "3rd", "4th", "5th"];

export default function Prizes({ prizes }: { prizes: prizeSchema[] }) {
  return (
    <div className="flex flex-row w-full justify-between items-stretch p-10 text-center">
      {prizes.map((prize, index) => {
        return (
          <div key={index} className="flex flex-col items-center w-full">
            <Heading className="flex text-center items-center mb-2 ">
              {places[index] + " place: " + prize.name}
            </Heading>
            <div className="flex-grow flex items-center justify-center w-full px-2">
              {prize.img_url && (
                <Image
                  width={300}
                  height={300}
                  src={prize.img_url}
                  alt={"Challenge Prize"}
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
