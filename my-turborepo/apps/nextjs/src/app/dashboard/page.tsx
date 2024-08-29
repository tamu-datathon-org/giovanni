export const runtime = "edge";

// These will map to buttons on the dashboard
const pages = [
  { href: "/signout", name: "Sign out" },
  { href: "/apply", name: "Apply" },
  { href: "/discord", name: "Link with Discord" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Dashboard
      </h1>
      <div className="flex flex-col gap-2">
        <ul>
          {pages.map((page) => (
            <li key={page.href}>{page.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
