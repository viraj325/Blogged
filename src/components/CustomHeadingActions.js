import {
    useLexicalComposerContext
} from "@lexical/react/LexicalComposerContext"
import {FORMAT_HEADING_COMMAND} from "./CustomHeadingPLugin"

export const CustomHeadingActions = () => {
    const [editor] = useLexicalComposerContext();

    const handleOnClick = (tag) => {
        editor.dispatchCommand(FORMAT_HEADING_COMMAND, tag)
    }

    return (
        <div style={{marginTop: '10px'}}>
            <span style={{fontWeight: 'bold'}}>Align actions</span>
            <div>
                {(["h1", "h2", "h3", "h4", "h5"].map((tag) => {
                    return (
                        <button key={tag} onClick={() => handleOnClick(tag)}>
                            {tag}
                        </button>
                    )
                }))}
            </div>
        </div>
    );
}