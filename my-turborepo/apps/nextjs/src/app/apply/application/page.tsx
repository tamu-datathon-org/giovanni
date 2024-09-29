import { ApplicationForm } from "~/app/_components/application-form";

export default function Page() {
  return (
    <>
      <div className="absolute top-0 h-screen w-screen overflow-auto bg-black">
        <div className="h-10 flex-grow" />
        <div className="font-XPfont flex justify-center">
          <ApplicationForm />
        </div>
        <div className="h-10 flex-grow" />
      </div>
    </>
  );
}
