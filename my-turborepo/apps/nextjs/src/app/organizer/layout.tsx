import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import { auth } from "@vanni/auth";
import { headers } from "next/headers";

import OrganizerNavBar from "../_components/organizer/navigation-bar";

export default async function OrganizerLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (session) {
    try {
      await api.auth.validateOrganizerAuth();
    } catch (e) {
      redirect("/login?callbackUrl=/organizer&message=unauthorized");
    }
  } else {
    redirect("/login?callbackUrl=/organizer");
  }

  return (
    <>
      <div className="min-h-screen bg-slate-400 font-mono pt-24 pb-24">
        <OrganizerNavBar></OrganizerNavBar>
        {children}
      </div>
    </>
  );
}
