import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext"
import {INSERT_CHECK_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND} from "@lexical/list"
import React from "react"

export const ListActions = () => {
    const [editor] = useLexicalComposerContext()

    const handleOrderedOnClick = () => {
        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
    }

    const handleUnorderedOnClick = () => {
        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
    }

    const handleCheckOnClick = () => {
        editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined)
    }

    return (
        <div style={{display: "flex"}}>
            <button className="menu-item" onClick={handleOrderedOnClick}>o</button>
            <button className="menu-item" onClick={handleUnorderedOnClick}>uo</button>
            <button className="menu-item" onClick={handleCheckOnClick}>c</button>
        </div>
    )
}