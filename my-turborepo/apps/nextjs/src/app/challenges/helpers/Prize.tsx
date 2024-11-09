import Image from "next/image";

import Heading from "~/app/challenges/helpers/Heading";

interface prizeSchema {
  name: string;
  img_url: string;
}

export default function Prize(props: prizeSchema[]) {
  return (
    <>
      {props.map((prize) => {
        return (
          <div>
            <Heading>{prize.name}</Heading>
            <Image
              width={500}
              height={500}
              src={prize.img_url}
              alt={"Challenge Prize"}
            />
          </div>
        );
      })}
    </>
  );
}
