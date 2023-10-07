import {UNDO_COMMAND, REDO_COMMAND} from 'lexical'
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext"
import {MdRedo, MdUndo} from "react-icons/md";

export const CustomHistoryActions = () => {
    const [editor] = useLexicalComposerContext()
    return (
        <>
            <button className="menu-item" onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}><MdUndo/></button>
            <button className="menu-item" onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}><MdRedo/></button>
        </>
    )
}