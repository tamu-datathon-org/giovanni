import { redirect } from "next/navigation";

import { auth, signIn } from "@vanni/auth";

import BackgroundImage from "~/app/_components/images/background";

export default async function PreregistrationLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    "use server";
    await signIn();
  }
  return (
    <>
      <BackgroundImage
        desktop_src={"/assets/wallpaper.png"}
        mobile_src={"/assets/wallpaper-mobile.png"}
        alt={"Dashboard background"}
      />
      <div className="max-h-screen-sm overflow-hidden">{children}</div>
    </>
  );
}
