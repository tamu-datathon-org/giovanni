import { redirect } from "next/navigation";

export default function preRegistrationLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  redirect("/apply/application")
  return (
    <>
      <div className="max-h-screen-sm overflow-hidden">{children}</div>
    </>
  );
}
