import { signOut } from "@vanni/auth";

export default function OrganizerPage() {
  return (
    <div>
      <h1>Welcome to the Organizer Page</h1>
      <button onClick={ async () => {
        "use server";
        await signOut();
      }}>
        Sign Out!
      </button>
    </div>
  );
}
