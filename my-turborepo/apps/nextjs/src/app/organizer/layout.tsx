import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@vanni/auth";

import { api } from "~/trpc/server";
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
    } catch (_e) {
      console.error(_e);
      redirect("/login?callbackUrl=/organizer&message=unauthorized");
    }
  } else {
    redirect("/login?callbackUrl=/organizer");
  }

  return (
    <>
      <div className="min-h-screen bg-slate-400 pb-24 pt-24 font-mono">
        <OrganizerNavBar></OrganizerNavBar>
        {children}
      </div>
    </>
  );
}
