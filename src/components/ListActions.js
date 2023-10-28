import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext"
import {INSERT_CHECK_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND} from "@lexical/list"
import React from "react"
import {MdFormatListBulleted, MdFormatListNumbered} from "react-icons/md";

export const ListActions = () => {
    const [editor] = useLexicalComposerContext()

    const handleOrderedOnClick = () => {
        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
    }

    const handleUnorderedOnClick = () => {
        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
    }

    return (
        <div style={{display: "flex"}}>
            <button className="menu-item" onClick={handleOrderedOnClick}><MdFormatListNumbered/></button>
            <button className="menu-item" onClick={handleUnorderedOnClick}><MdFormatListBulleted/></button>
        </div>
    )
}