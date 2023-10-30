import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext"
import {INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND} from "@lexical/list"
import {MdCode, MdFormatListBulleted, MdFormatListNumbered} from "react-icons/md"
import {CODE_LANGUAGE_MAP, DEFAULT_CODE_LANGUAGE} from "@lexical/code"
import React from "react"

export const ListActions = () => {
    const [editor] = useLexicalComposerContext()

    const handleOrderedOnClick = () => {
        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
    }

    const handleUnorderedOnClick = () => {
        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
    }

    const handleCodeOnClick = () => {
        editor.dispatchCommand(CODE_LANGUAGE_MAP, undefined)
    }

    return (
        <div style={{display: "flex"}}>
            <button className="menu-item" onClick={handleOrderedOnClick}><MdFormatListNumbered/></button>
            <button className="menu-item" onClick={handleUnorderedOnClick}><MdFormatListBulleted/></button>
            <button className="menu-item" onClick={handleCodeOnClick}><MdCode/></button>
        </div>
    )
}