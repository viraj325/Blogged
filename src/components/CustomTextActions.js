import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext"
import {FORMAT_TEXT_COMMAND} from 'lexical'
import {
    MdOutlineCode, MdOutlineFormatBold,
    MdOutlineFormatItalic,
    MdOutlineFormatUnderlined,
    MdStrikethroughS,
    MdSubscript,
    MdSuperscript
} from "react-icons/md";

export const CustomTextActions = () => {
    const [editor] = useLexicalComposerContext()

    const handleOnClick = (formatType) => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatType)
    }

    return (
        <div style={{display: "flex"}}>
            <button className="menu-item" onClick={() => handleOnClick('Bold'.toLowerCase())}><MdOutlineFormatBold/></button>
            <button className="menu-item" onClick={() => handleOnClick('Italic'.toLowerCase())}><MdOutlineFormatItalic/></button>
            <button className="menu-item" onClick={() => handleOnClick('Underline'.toLowerCase())}><MdOutlineFormatUnderlined/></button>
            <button className="menu-item" onClick={() => handleOnClick('Code'.toLowerCase())}><MdOutlineCode/></button>
            <button className="menu-item" onClick={() => handleOnClick('Highlight'.toLowerCase())}>Highlight</button>
            <button className="menu-item" onClick={() => handleOnClick('Strikethrough'.toLowerCase())}><MdStrikethroughS/></button>
            <button className="menu-item" onClick={() => handleOnClick('Subscript'.toLowerCase())}><MdSubscript/></button>
            <button className="menu-item" onClick={() => handleOnClick('Superscript'.toLowerCase())}><MdSuperscript/></button>
        </div>
    )
}

/*
MdOutlineFormatIndentDecrease
MdOutlineFormatIndentIncrease
<div style={{marginTop: '10px'}}>
            <span style={{fontWeight: 'bold'}}>Text actions</span>
            <div>
                {[
                    'Bold',
                    'Italic',
                    'Underline',
                    'Code',
                    'Highlight',
                    'Strikethrough',
                    'Subscript',
                    'Superscript'
                ].map(value => {
                    return (
                        <button
                            onClick={() => handleOnClick(value.toLowerCase())}>
                            {value}
                        </button>
                    )
                })}
            </div>
        </div>
 */