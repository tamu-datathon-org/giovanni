import Image from "next/image";



export default function Prizes() {
  return (
    <section
      aria-label="Prizes"
      className="font-anonymous max-w-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#2A2523] to-[#322C29] py-20 text-gray-400"
      id="prizes"
    >
      <h2 className="py-4 text-5xl text-white">Prizes</h2>
      <div className="relative mx-auto aspect-[3/5] w-[90vw] sm:w-[50vw]">
        {/* Background layer */}
        <Image
          src="/images/prizes/bg.svg"
          alt="background"
          fill
          sizes="(max-width: 768px) 90vw, 50vw"
          className="z-0 object-contain"
          draggable={false}
          priority
          unoptimized
        />

        {/* Mid layer — slightly shifted right */}
        <Image
          src="/images/prizes/middle_layer.svg"
          alt="second layer"
          fill
          sizes="(max-width: 768px) 90vw, 50vw"
          className="z-10 -translate-x-1 scale-[0.95] object-contain"
          draggable={false}
          loading="lazy"
          unoptimized
        />

        <Image
          src="/images/prizes/fourth_layer.svg"
          alt="prizes layer"
          fill
          sizes="(max-width: 768px) 90vw, 50vw"
          className="z-40 -translate-y-2 scale-[0.8] object-contain"
          draggable={false}
          loading="lazy"
          unoptimized
        />


      </div>
    </section>
  );
}
