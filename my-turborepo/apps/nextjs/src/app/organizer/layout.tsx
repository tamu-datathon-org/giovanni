import { auth, signIn } from "@vanni/auth";
import OrganizerNavBar from "../_components/organizer/navigation-bar";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";

export default async function OrganizerLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session) {
        ("use server");
        await signIn(undefined, { redirectTo: "/organizer" });
    }
    try {
        await api.auth.validateOrganizerAuth();
    } catch (e) {
        redirect("/");
    }

    console.log("hello");
    console.log(session);

    return (
        <>
            <div className="max-h-screen-sm h-screen overflow-hidden font-mono">
                <OrganizerNavBar></OrganizerNavBar>
                {children}
            </div>
        </>
    );
}