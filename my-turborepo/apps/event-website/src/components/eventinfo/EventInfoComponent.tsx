import EventTitle from './EventTitle';
import Shapes from "@/components/eventinfo/Shapes";

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
                            10:00 AM - 6:00 PM
                        </h2>
                        <a href="https://maps.app.goo.gl/ZF6C7Fsd8xJNBSjM9"
                            className="text-xl md:text-2xl font-bold hover:cursor-pointer underline"
                            target="_blank"
                            rel="noopener noreferrer">
                            ILCB 207
                        </a>
                        <h2 className="text-2xl font-bold">
                            <a href=""></a>
                        </h2>
                    </div>
                </div>

                <img src="/images/locationcard.png" alt="Location info" />
            </div>

        </div>
    );
}
