export const runtime = "edge";

// These will map to buttons on the dashboard
const pages = [
  { href: "/signout", name: "Sign out" },
  { href: "/apply", name: "Apply" },
  { href: "/discord", name: "Link with Discord" },
];

function Button({ href, name }: { href: string; name: string }) {
  return (
    <a href={href} className="rounded-md bg-blue-500 px-4 py-2 text-white">
      {name}
    </a>
  );
}

function ButtonContainer() {
  return (
    <div className="flex flex-col gap-2">
      <ul>
        {pages.map((page) => (
          <li>
            <Button href={page.href} name={page.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Dashboard
      </h1>
      <ButtonContainer />
    </div>
  );
}
