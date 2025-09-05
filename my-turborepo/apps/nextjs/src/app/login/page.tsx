import LoginButton from "../_components/auth/login_button";

export default function LoginPage({
  searchParams
}: {
  searchParams: { callbackUrl: string | undefined };
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <h1>Login Page</h1>
      <LoginButton
        title="Google"
        connectionId="google-oauth2"
        callbackUrl={searchParams.callbackUrl}
      />
      <LoginButton
        title="Windows"
        connectionId="windowslive"
        callbackUrl={searchParams.callbackUrl}
      />
      <LoginButton
        title="GitHub"
        connectionId="github"
        callbackUrl={searchParams.callbackUrl}
      />
    </div>
  );
}