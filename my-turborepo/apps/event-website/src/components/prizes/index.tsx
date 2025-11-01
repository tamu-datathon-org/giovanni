import Image from "next/image";

export default function Prizes() {

  return (
    <section aria-label="Prizes" className="font-anonymous py-20 text-gray-400 w-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#2A2523] to-[#322C29]" id="prizes">
      <h2 className="text-white py-4 text-5xl">
        Prizes
      </h2>
      <div className="relative w-[90vw] sm:w-[70vw] aspect-[10/13] mx-auto">
        {/* Background layer */}
        <Image
          src="/images/prizes/bg.svg"
          alt="background"
          fill
          className="object-contain z-0"
          draggable={false}
        />

        {/* Mid layer — slightly shifted right */}
        <Image
          src="/images/prizes/middle_layer.svg"
          alt="second layer"
          fill
          className="object-contain z-10 -translate-x-1 scale-[0.95]"
          draggable={false}
        />

        <Image
          src="/images/prizes/fourth_layer.svg"
          alt="prizes layer"
          fill
          className="object-contain z-40 scale-[0.8] -translate-y-2"
          draggable={false}
        />

        {/* Optional content overlay */}
        {/* <div className="absolute inset-0 flex items-center justify-center z-30">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">Prizes</h1>
        </div> */}
      </div>

    </section>
  );
}