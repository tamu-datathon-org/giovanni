import { CreatePreregistrationForm } from "../_components/preregistration-form";

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Page() {
    return (
        <div className="overflow-hidden h-screen w-screen">
            < CreatePreregistrationForm />
        </div>
    )
}