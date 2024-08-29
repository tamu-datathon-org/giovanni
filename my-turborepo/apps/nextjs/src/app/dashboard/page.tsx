import { redirect } from "next/navigation";

import { auth } from "@vanni/auth";

export const runtime = "edge";

// These will map to buttons on the dashboard
const pages = [
  { href: "/signout", name: "Sign out" },
  { href: "/apply", name: "Apply" },
  { href: "/discord", name: "Link with Discord" },
];

function DashboardButton({ href, name }: { href: string; name: string }) {
  return (
    <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
      <a href={href}>{name}</a>
    </button>
  );
}

function ButtonContainer() {
  return (
    <div className="flex flex-col gap-2">
      <ul>
        {pages.map((page) => (
          <li>
            <DashboardButton href={page.href} name={page.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

async function MainBody() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h2>Welcome, {session.user.id}!</h2>
      <ButtonContainer />
    </div>
  );
}

export default function DashboardPage() {
  return (
    //TODO: Add some admin actions and a way to separate them from user actions
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Dashboard
      </h1>
      <MainBody />
    </div>
  );
}
