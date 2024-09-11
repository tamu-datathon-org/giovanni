import { CreatePreregistrationForm } from "../_components/preregistration-form";
import IconList from "../_components/IconList"; // Import the 'IconList' component and its props type

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Page() {
    return (
        <div className="overflow-hidden h-screen w-screen lg:bg-large-device bg-mobile-device bg-cover bg-no-repeat bg-center ">
            <div className="z-30 relative">
                <CreatePreregistrationForm />
            </div>
            <div className="absolute top-0 left-0 w-screen bg-black h-screen opacity-40"></div>
        </div>
    )
}