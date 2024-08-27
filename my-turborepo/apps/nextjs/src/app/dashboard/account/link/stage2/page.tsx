import { auth, signIn, signOut } from "@vanni/auth";
import { Button } from "@vanni/ui/button";

async function SignInAndLink(
  redirectUri: string | undefined,
  connectionId: string,
) {
  const session1 = await auth();
  const primaryToken = session1?.user.id;

  ("use server");
  await signIn("auth0", redirectUri ? { redirectTo: redirectUri } : {}, {
    connection: connectionId,
  });

  const session2 = await auth();
  const secondaryToken = session2?.user.id;

  // Link the accounts
  await fetch(
    `https://login.auth0.com/api/v2/users/${primaryToken}/identities`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        link_with: targetUserIdToken,
      }),
    },
  );
}

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
        await SignInAndLink(redirectUri, connectionId);
      }}
    >
      {buttonText}
    </Button>
  );
}

export default async function LinkPageStage2() {
  await signOut();
  await signIn();
  return (
    <div>
      <h2>Link new account:</h2>
      <LinkButton connectionId="discord" buttonText="Sign in with Discord" />
      <LinkButton connectionId="apple" buttonText="Sign in with Apple" />
      <LinkButton connectionId="github" buttonText="Sign in with GitHub" />
      <LinkButton
        connectionId="google-oauth2"
        buttonText="Sign in with Google"
      />
    </div>
  );
}
