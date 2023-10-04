import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {FORMAT_TEXT_COMMAND} from 'lexical';

export const CustomTextActions = () => {
    const [editor] = useLexicalComposerContext();

    const handleOnClick = (formatType) => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatType)
    }

    return (
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
    );
}