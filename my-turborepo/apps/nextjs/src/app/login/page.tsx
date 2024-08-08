import { AuthShowcase } from "../_components/auth-showcase";

export const runtime = "edge";

export default function LoginPage() {
  return (
    <main className="container h-screen py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Log In
        </h1>
        <AuthShowcase />
      </div>
    </main>
  );
}
