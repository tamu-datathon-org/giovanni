import { LoginButton } from "~/app/_components/auth/login_button";

export const runtime = "edge";

function getLinkedAccounts() {

}

export default function LoginPage() {
  return (
    <main className="container h-screen py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Linked accounts:
        </h1>

        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Link more accounts:
        </h1>
        <form>
          <LoginButton connectionId="discord" buttonText="Sign in with Discord" />
          <LoginButton connectionId="github" buttonText="Sign in with GitHub" />
          <LoginButton
            connectionId="google-oauth2"
            buttonText="Sign in with Google"
          />
          <LoginButton
            connectionId="windowslive"
            buttonText="Sign in with Microsoft"
          />
        </form>
      </div>
    </main>
  );
}
