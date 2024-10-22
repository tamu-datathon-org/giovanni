import { auth, signIn } from "@vanni/auth";

export default async function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    ("use server");
    await signIn(undefined, { redirectTo: "/admin/jankury" });
  }

  console.log("hello");
  console.log(session);
  return <section>{children}</section>;
}
