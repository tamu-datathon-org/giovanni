import { Button } from "@vanni/ui/button";
import Link from "next/link";
// Import the 'IconList' component and its props type
import WindowContainer from "../_components/WindowContainer";
import IconList from "../_components/IconList";

// `app/registration-clone/page.tsx` is the UI for the `/registration-clone` URL
export default function Page() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="relative z-30 flex flex-col justify-center items-center h-screen">
        <WindowContainer>
          <h1 className="mb-4 text-4xl">Registration is open!</h1>
          <Button className="xpBorder submitBtn my-4 w-fit bg-cyan-700 text-xl font-extrabold">
            <Link href="/apply/application">Click here to apply now.</Link>
          </Button>
        </WindowContainer>
        <IconList />
      </div>
      <div className="absolute left-0 top-0 h-screen w-screen bg-black opacity-40"></div>
    </div>
  );
}
