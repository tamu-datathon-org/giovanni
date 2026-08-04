import { auth } from "@vanni/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/** Mirrors `protectedProcedure` in packages/api/src/trpc.ts (TAMU email for applicant APIs). */
function isTamuEmail(email: string) {
  return email.endsWith("@tamu.edu");
}

export default async function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login?callbackUrl=/apply");
  }

  if (!isTamuEmail(session.user.email)) {
    redirect("/wrong-account");
  }

  return (
    <section className="">
      {children}
    </section>
  );
}
