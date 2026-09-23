import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import { auth } from "@vanni/auth";
import { headers } from "next/headers";

import { EventSelectionProvider } from "../_components/organizer/event-selection";
import OrganizerNavBar from "../_components/organizer/navigation-bar";

export default async function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    try {
      await api.auth.validateOrganizerAuth();
    } catch (_e) {
      redirect("/login?callbackUrl=/organizer&message=unauthorized");
    }
  } else {
    redirect("/login?callbackUrl=/organizer");
  }

  return (
    <EventSelectionProvider>
      <div className="min-h-screen bg-slate-400 font-mono pt-9 pb-10">
        <OrganizerNavBar />
        {children}
      </div>
    </EventSelectionProvider>
  );
}
