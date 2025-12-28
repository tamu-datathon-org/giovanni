import { auth } from "@vanni/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

export default async function AdminLayout({
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
      redirect("/login?callbackUrl=/admin&message=unauthorized");
    }
  } else {
    redirect("/login?callbackUrl=/admin");
  }

  return <section>{children}</section>;
}
