import { signIn } from "@vanni/auth";

export const runtime = "edge";
function LinkButton({
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
export default function LinkPage() {
  // You can await this here if you don't want to show Suspense fallback below

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Link account
      </h1>
    </div>
  );
}
