import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {FORMAT_TEXT_COMMAND} from 'lexical';
import {Iterator} from "../Iterator";

export const CustomTextActions = () => {
    const [editor] = useLexicalComposerContext();

    const handleOnClick = (formatType) => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatType)
    }

    return (
        <Iterator
            array={[
                'Bold',
                'Italic',
                'Underline',
                'Code',
                'Highlight',
                'Strikethrough',
                'Subscript',
                'Superscript'
            ]}
            component={ item => (
                <button onClick={() => handleOnClick(item.toLowerCase())}>{item}</button>
            )}
        />
    )
}

/*
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