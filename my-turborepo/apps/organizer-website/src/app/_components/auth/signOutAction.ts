
"use server";
import { auth } from "@vanni/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function signOutAction(pathname: string) {
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect(`/login?message=signedout&callbackUrl=${pathname}`);
}
