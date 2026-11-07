import { redirect } from "next/navigation";

// The full list now lives at /challenges; this keeps old links working.
export default function AllChallengesPage() {
  redirect("/challenges");
}
