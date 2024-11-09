import Title from "~/app/challenges/helpers/Title";

export default function Challenge() {
    //TODO: Get XML data, and based on that data, automatically generate which components are going to be used

    const challenges = [
        "Push Battle",
        "Connections AI",
        "SQL Game",
        "Rev's Riddles",
        "Roni's Challenge",
        "Capital One"
    ]

    return (
        <div className="w-full h-full p-8">
            <Title>Challenges</Title>

            <a className="px-4 py-3 border-2" href="/">Back</a>

            <div className="flex gap-4 flex-wrap mt-8">
                {
                    challenges.map((challenge, index) => {
                        return (
                            <a href={`/challenges/${challenge.replaceAll(" ", "_").replaceAll("'", "")}`} className="w-48 aspect-square bg-white/90 rounded-lg grid place-items-center shadow-md hover:shadow-2xl cursor-pointer" key={index}>
                                {challenge}
                            </a>

                        )
                    })
                }
                <a href={`https://docs.google.com/document/d/1lUrYbJNUuQ7u2q6QDXBEBv45kj0h-41a8HM3pRVcmj8/edit?usp=sharing`} className="w-48 aspect-square bg-white/90 rounded-lg grid place-items-center shadow-md hover:shadow-2xl cursor-pointer" key={10}>
                </a>
            </div>
        </div>
    );
}
