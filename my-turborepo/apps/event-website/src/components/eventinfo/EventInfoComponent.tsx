import EventTitle from './EventTitle';
import Shapes from "@/components/eventinfo/Shapes";
import Image from 'next/image';

export default function EventInfoComponent({ }) {

    return (
        <div id="Event Info" className="flex flex-col items-center gap-10">
            <EventTitle/>
            <div className="flex flex-col relative justify-center items-center text-offblacktext">
                <div
                    className="gap-2 flex flex-col justify-center items-center w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute  text-center mb-3">
                    <Shapes/>

                    <div className="pb-8 font-location">
                        <h2 className="text-xl md:text-2xl font-bold">
                            April 5, 2025
                        </h2>
                        <h2 className="text-xl md:text-2xl font-bold">
                            8:30 AM - 4:30 PM
                        </h2>
                        <a href="https://maps.app.goo.gl/ZF6C7Fsd8xJNBSjM9"
                            className="text-xl md:text-2xl font-bold hover:cursor-pointer underline"
                            target="_blank"
                            rel="noopener noreferrer">
                            ILCB 207
                        </a>
                    </div>
                </div>
        <img src="/images/locationcard.png" alt="Location info" />
      </div>
      <h2 className="font-squid-game align-center flex flex-col pt-6 text-3xl font-bold md:text-4xl">
        Parking <span>Information</span>
        <p className="mt-8 font-inter text-sm text-white/90 max-w-md text-center">
          Unfortunately, due to Ring Weekend, parking will be limited. <br />We
          recommend parking at the <a href="https://maps.app.goo.gl/EbAriecKyqa6r8bXA" className="underline font-bold text-lg" >SBG parking garage</a> for $10.
        </p>
      </h2>
      <div className="relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-lg p-8">
        <Image
          src="/images/locationcard.png"
          alt="Location background"
          width={1000}
          height={800}
          className="absolute inset-0 h-full w-full object-cover "
        />
        <div className="relative z-5 flex flex-col items-center justify-center gap-4">
          <div className="relative w-full max-w-xl">
            <div className="absolute inset-0 rounded-lg"></div>
            <Image
              src="/images/map.png"
              alt="Parking map"
              width={1400}
              height={800}
              className="mt-4 h-auto w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* <div className="text-offblacktext relative flex flex-col items-center justify-center">
        <div className="absolute left-1/2 top-1/2 mb-3 flex w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center  gap-2 text-center">
          <div className="mt-4">
            <h2 className="text-xl font-bold md:text-3xl">
              Parking Information
            </h2>
            <p className="text-lg md:text-xl">SBG Parking: $10</p>
            <img
              src="/images/map.png"
              alt="Parking map"
              className="mt-4 h-auto max-w-full"
            />
          </div>
        </div>
      </div> */}
    </div>
  );
}
