import { signIn } from "@vanni/auth";
import { Button } from "@vanni/ui/button";

export const runtime = "edge";

function LoginButton({
  providerId,
  buttonText,
}: {
  providerId: string;
  buttonText: string;
}) {
  return (
    <Button
      size="lg"
      formAction={async () => {
        "use server";
        await signIn(providerId);
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
          <LoginButton providerId="discord" buttonText="Sign in with Discord" />
          <LoginButton providerId="auth0" buttonText="Sign in with Auth0" />
          <Button
            size="lg"
            onClick={async () => {
              "use server";
              await signIn(
                "auth0",
                { redirectTo: "/login" },
                {
                  connection: "google-oauth2",
                },
              );
            }}
          >
            Sign in with Google
          </Button>
        </form>
      </div>
    </main>
  );
}
