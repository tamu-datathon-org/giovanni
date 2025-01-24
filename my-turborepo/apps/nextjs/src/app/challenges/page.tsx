import Title from "~/app/challenges/helpers/Title";

import "../_components/customCss.scss";

export default function Challenge() {
  //TODO: Get XML data, and based on that data, automatically generate which components are going to be used

  const challenges = [
    "Push Battle",
    "Connections AI",
    "Rev's Riddles",
    "Roni's Challenge",
    "Capital One",
    "Baker Hughes",
  ];

  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center p-8">
        <Title>Challenges</Title>

        <a
          className="compStyling border border-black bg-[#f5f5f5] px-2 py-3 text-black hover:bg-[#e4e3e4] hover:text-black"
          href="/"
        >
          Back
        </a>
        <div className="mx-auto mt-8 flex w-full flex-wrap items-center justify-center gap-4 text-2xl sm:w-3/4">
          {challenges.map((challenge, index) => {
            return (
              <a
                href={`/challenges/${challenge.replaceAll(" ", "_").replaceAll("'", "")}`}
                className="grid aspect-square w-52 cursor-pointer place-items-center rounded-lg bg-white/90 shadow-md hover:shadow-2xl"
                key={index}
              >
                {challenge}
              </a>
            );
          })}
          <a
            href={`https://docs.google.com/document/d/1lUrYbJNUuQ7u2q6QDXBEBv45kj0h-41a8HM3pRVcmj8/edit?usp=sharing`}
            className="grid aspect-square w-52 cursor-pointer place-items-center rounded-lg bg-white/90 shadow-md hover:shadow-2xl"
            key={10}
          >
            TAMIDS
          </a>
        </div>
      </div>
      <div className="flex items-center justify-center pt-6">
        <a
          className="compStyling w-1/4 border border-black bg-[#f5f5f5] text-center text-black hover:bg-[#e4e3e4] hover:text-black"
          href="https://docs.google.com/document/d/1IcCv1fP8CSce-cJIU6PbpH849xoOF4FyyKOc1J-oe0g/edit?usp=sharing"
          target="_blank"
        >
          Guide to Using Attorney
        </a>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <a
          className="compStyling w-1/4 border border-black bg-[#f5f5f5] text-center text-black hover:bg-[#e4e3e4] hover:text-black"
          href="https://docs.google.com/document/d/1EJsthyw8WQ-mEd4OiFqskBpQJhBdiymRVMpFRvOKg9s/edit?tab=t.0"
          target="_blank"
        >
          Challenges Submission Guide
        </a>
      </div>
    </>
  );
}
