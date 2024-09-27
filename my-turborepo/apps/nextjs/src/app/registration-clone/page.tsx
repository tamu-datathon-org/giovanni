import { CreatePreregistrationForm } from "../_components/preregistration-form";
import IconList from "../_components/IconList"; // Import the 'IconList' component and its props type
import WindowContainer from "../_components/WindowContainer";
import { Button } from "@vanni/ui/button";

// `app/registration-clone/page.tsx` is the UI for the `/registration-clone` URL
export default function Page() {
    return (
        <div className="overflow-hidden h-screen w-screen lg:bg-large-device bg-mobile-device bg-cover bg-no-repeat bg-center ">
            <div className="z-30 relative flex flex-col items-center justify-center h-full">
                
                {/* <CreatePreregistrationForm /> */}
                <WindowContainer>
                <h1 className="text-white text-4xl mb-4">Registration is open!</h1>
                <Button className="xpBorder submitBtn my-4 w-fit bg-cyan-700 text-xl font-extrabold"
              type="submit">
                Click here to apply now.
            </Button>
                </WindowContainer>
            </div>
            <div className="absolute top-0 left-0 w-screen bg-black h-screen opacity-40"></div>
        </div>
    )
}