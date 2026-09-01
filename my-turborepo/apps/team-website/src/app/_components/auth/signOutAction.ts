"use server";
import { auth } from "@vanni/auth";
import { normalizeCallbackPath } from "@vanni/auth/callback-url";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function signOutAction(pathname: string) {
  await auth.api.signOut({
    headers: headers(),
  });
  const callbackPath = normalizeCallbackPath(pathname);
  redirect(
    `/login?message=signedout&callbackUrl=${encodeURIComponent(callbackPath)}`,
  );
}
