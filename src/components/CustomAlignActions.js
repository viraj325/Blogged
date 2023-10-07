import {
    useLexicalComposerContext
} from "@lexical/react/LexicalComposerContext";
import {
    FORMAT_ELEMENT_COMMAND,
    OUTDENT_CONTENT_COMMAND,
    INDENT_CONTENT_COMMAND
} from 'lexical';
import {Iterator} from "../Iterator";
import {MdFormatAlignCenter, MdFormatAlignJustify, MdFormatAlignLeft, MdFormatAlignRight} from "react-icons/md";

export const CustomAlignActions = () => {
    const [editor] = useLexicalComposerContext();

    const handleOnClick = (formatType) => {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, formatType)
    }

    return (
        <div style={{display: "flex"}}>
            <button className="menu-item" onClick={() => handleOnClick('Justify'.toLowerCase())}><MdFormatAlignJustify/></button>
            <button className="menu-item" onClick={() => handleOnClick('Center'.toLowerCase())}><MdFormatAlignCenter/></button>
            <button className="menu-item" onClick={() => handleOnClick('Left'.toLowerCase())}><MdFormatAlignLeft/></button>
            <button className="menu-item" onClick={() => handleOnClick('Right'.toLowerCase())}><MdFormatAlignRight/></button>
        </div>
    )
}

/*
<button onClick={() => editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)}>
                Outdent
            </button>
            <button onClick={() => editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)}>
                Indent
            </button>

<div style={{marginTop: '10px'}}>
            <span style={{fontWeight: 'bold'}}>Align actions</span>
            <div>
                {[
                    'Left',
                    'Center',
                    'Right',
                    'Justify',
                ].map(value => {
                    return (
                        <button
                            onClick={() => handleOnClick(value.toLowerCase())}>
                            {value}
                        </button>
                    )
                })}
                <button
                    onClick={() => editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)}>
                    Outdent
                </button>
                <button
                    onClick={() => editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)}>
                    Indent
                </button>
            </div>
        </div>
 */