"use client";

import {
    AdmonitionDirectiveDescriptor,
    MDXEditor,
    MDXEditorMethods,
    codeBlockPlugin,
    codeMirrorPlugin,
    diffSourcePlugin,
    directivesPlugin,
    frontmatterPlugin,
    headingsPlugin,
    imagePlugin,
    linkDialogPlugin,
    linkPlugin,
    listsPlugin,
    markdownShortcutPlugin,
    quotePlugin,
    sandpackPlugin,
    tablePlugin,
    thematicBreakPlugin,
    toolbarPlugin,
} from "@mdxeditor/editor";
import React, { FC } from "react";
import { KitchenSinkToolbar } from "./KitchenSinkToolbar";

interface EditorProps {
    markdown: string;
    // editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs.
 */

const Editor: FC<EditorProps> = ({ markdown }) => {
    const ref = React.useRef<MDXEditorMethods>(null)
    return (
        <>
            <MDXEditor
                ref={ref}
                markdown={markdown}
                contentEditableClassName="prose max-w-full font-sans"
                plugins={[
                    toolbarPlugin({toolbarContents: () => <KitchenSinkToolbar/>}),
                    listsPlugin(),
                    quotePlugin(),
                    headingsPlugin({allowedHeadingLevels: [1, 2, 3]}),
                    linkPlugin(),
                    linkDialogPlugin(),
                    imagePlugin({
                        imageAutocompleteSuggestions: [
                            "https://via.placeholder.com/150",
                            "https://via.placeholder.com/150",
                        ],
                        imageUploadHandler: async () =>
                            Promise.resolve("https://picsum.photos/200/300"),
                    }),
                    tablePlugin(),
                    thematicBreakPlugin(),
                    frontmatterPlugin(),
                    codeBlockPlugin({defaultCodeBlockLanguage: ""}),
                    codeMirrorPlugin({
                        codeBlockLanguages: {
                            js: "JavaScript",
                            css: "CSS",
                            txt: "Plain Text",
                            tsx: "TypeScript",
                            "": "Unspecified",
                        },
                    }),
                    directivesPlugin({
                        directiveDescriptors: [AdmonitionDirectiveDescriptor],
                    }),
                    diffSourcePlugin({viewMode: "rich-text", diffMarkdown: "boo"}),
                    markdownShortcutPlugin(),
                ]} onChange={console.log}
            />

            {/* FETCHES MARKDOWN TEXT FROM EDITOR */}
            <button onClick={() => console.log(ref.current?.getMarkdown())}>Get markdown</button>
        </>
    );
};

export default Editor;