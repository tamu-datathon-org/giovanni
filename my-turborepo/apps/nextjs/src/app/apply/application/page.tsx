import { ApplicationForm } from "~/app/_components/application-form";

export default function Page() {
  return (
    <>
      <div className="absolute top-0 overflow-auto h-screen w-screen bg-black">
        <div className="flex-grow h-10" />
        <div className="font-XPfont flex justify-center">
          <ApplicationForm />
        </div>
        <div className="flex-grow h-10" />
      </div>
    </>
  );
}
