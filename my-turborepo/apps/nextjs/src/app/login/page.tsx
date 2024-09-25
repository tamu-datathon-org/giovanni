import { signIn } from "@vanni/auth";
import { Button } from "@vanni/ui/button";

export const runtime = "edge";

function LoginButton({
  connectionId,
  redirectUri,
  buttonText,
}: {
  connectionId: string;
  redirectUri?: string;
  buttonText: string;
}) {
  return (
    <Button
      size="lg"
      formAction={async () => {
        "use server";
        await signIn("auth0", redirectUri ? { redirectTo: redirectUri } : {}, {
          connection: connectionId,
        });
      }}
    >
      {buttonText}
    </Button>
  );
}

export default function LoginPage() {
  return (
    <main className="container h-screen py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Log In
        </h1>
        {/*<AuthShowcase />*/}

        <form>
          <LoginButton connectionId="github" buttonText="Sign in with GitHub" />
          <LoginButton
            connectionId="google-oauth2"
            buttonText="Sign in with Google"
          />
          <LoginButton connectionId="windowslive" buttonText="Sign in with Microsoft" />
        </form>
      </div>
    </main>
  );
}
