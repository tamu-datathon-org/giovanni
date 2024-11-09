import Title from "~/app/challenges/helpers/Title";
import "../_components/customCss.scss";

export default function Challenge() {
    //TODO: Get XML data, and based on that data, automatically generate which components are going to be used

    const challenges = [
        "Push Battle",
        "Connections AI",
        "SQL Game",
        "Rev's Riddles",
        "Roni's Challenge",
        "Capital One",
        "Baker Hughes"
    ]

    return (
        <div className="w-full h-full p-8 flex flex-col items-center justify-center">
            <Title>Challenges</Title>

            <a className="px-2 py-3 compStyling border border-black bg-[#f5f5f5] text-black hover:bg-[#e4e3e4] hover:text-black" href="/">Back</a>
            <div className="grid grid-cols-4 gap-4 mt-8 text-2xl w-fit mx-auto">
                {
                    challenges.map((challenge, index) => {
                        return (
                            <a href={`/challenges/${challenge.replaceAll(" ", "_").replaceAll("'", "")}`} className="w-52 aspect-square bg-white/90 rounded-lg grid place-items-center shadow-md hover:shadow-2xl cursor-pointer" key={index}>
                                {challenge}
                            </a>
                        )
                    })
                }
                <a href={`https://docs.google.com/document/d/1lUrYbJNUuQ7u2q6QDXBEBv45kj0h-41a8HM3pRVcmj8/edit?usp=sharing`} className="w-52 aspect-square bg-white/90 rounded-lg grid place-items-center shadow-md hover:shadow-2xl cursor-pointer" key={10}>
                    TAMIDS
                </a>
            </div>
        </div>
    );

}
