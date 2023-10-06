import {
    useLexicalComposerContext
} from "@lexical/react/LexicalComposerContext";
import {
    FORMAT_ELEMENT_COMMAND,
    OUTDENT_CONTENT_COMMAND,
    INDENT_CONTENT_COMMAND
} from 'lexical';
import {Iterator} from "../Iterator";

export const CustomAlignActions = () => {
    const [editor] = useLexicalComposerContext();

    const handleOnClick = (formatType) => {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, formatType)
    }

    return (
        <Iterator
            array={['Left', 'Center', 'Right', 'Justify']}
            component={ value => (
                <button onClick={() => handleOnClick(value.toLowerCase())}>{value}</button>
            )}
        />
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