import dynamic from "next/dynamic";

const EditorComp = dynamic(() => import("../_components/EditorComponent"), { ssr: false });

export default function Home() {
    const markdown = 'Begin Typing!'
    return (
        <>
            <div className="bg-amber-400 border-8 border-black">
                <EditorComp markdown={markdown} />
            </div>
        </>
    );
}