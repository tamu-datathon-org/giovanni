import { auth, signIn } from "@vanni/auth";

export default async function ApplyLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    "use server";
    await signIn();
  }

  console.log("hello");
  console.log(session);
  return <section>{children}</section>;
}
