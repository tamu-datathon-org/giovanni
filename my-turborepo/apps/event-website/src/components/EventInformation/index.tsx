import { Sekuya } from "next/font/google";
import PoolStory from "./PoolStory";

const sekuya = Sekuya({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function EventInformation() {
  return (
    <section
      id="event-information"
      aria-labelledby="event-information-heading"
      className="scroll-mt-24 bg-[#142009] px-4 pb-20 pt-32 sm:px-8 lg:pb-24 lg:pt-40"
    >
      <h2
        id="event-information-heading"
        className={`${sekuya.className} text-center text-[clamp(24px,6.5vw,96px)] font-normal not-italic leading-none tracking-normal text-[#FFB24C]`}
        style={{ textShadow: "0px 0px 10px #FFB24C" }}
      >
        EVENT
        <br />
        INFORMATION
      </h2>

      <PoolStory titleClassName={sekuya.className} />
    </section>
  );
}
