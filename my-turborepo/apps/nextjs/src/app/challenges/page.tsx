import Title from "~/app/challenges/helpers/Title";

export default function Challenge() {
    //TODO: Get XML data, and based on that data, automatically generate which components are going to be used

    const challenges = [
        "Pop Tac Toe",
        "Connections AI",
        "SQL Game",
        "Rev's Riddles",
        "Roni's Challenge"
    ]

    return (
        <div className="w-full h-full p-8">
            <Title>Challenges</Title>
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
            </div>
        </div>
    );
}
