import { CreatePreregistrationForm } from "../_components/preregistration-form";
import IconList from "../_components/IconList"; // Import the 'IconList' component and its props type

// `app/registration-clone/page.tsx` is the UI for the `/registration-clone` URL
export default function Page() {
    return (
        <div className="overflow-hidden h-screen w-screen lg:bg-large-device bg-mobile-device bg-cover bg-no-repeat bg-center ">
            <div className="z-30 relative flex flex-col items-center justify-center h-full">
                <h1 className="text-white text-4xl mb-4">Registration is open!</h1>
                <a href="/apply" className="text-white text-2xl underline">Click here to apply now.</a>
                <CreatePreregistrationForm />
            </div>
            <div className="absolute top-0 left-0 w-screen bg-black h-screen opacity-40"></div>
        </div>
    )
}