import { redirect } from "next/navigation";

import { auth, signIn } from "@vanni/auth";

import { api } from "~/trpc/server";
import OrganizerNavBar from "../_components/organizer/navigation-bar";

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

  if (session) {
    try {
      await api.auth.validateOrganizerAuth();
    } catch (e) {
      redirect("/");
    }
  }

  // console.log(session);

  return (
    <>
      <div className="min-h-screen bg-slate-400 font-mono pt-24 pb-24">
        <OrganizerNavBar></OrganizerNavBar>
        {children}
      </div>
    </>
  );
}
