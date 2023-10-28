import {useEffect} from "react"
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext"
import {COMMAND_PRIORITY_LOW} from "lexical"
import {
    INSERT_CHECK_LIST_COMMAND,
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
    insertList
} from "@lexical/list";

export const ListPlugin = () => {
    const [editor] = useLexicalComposerContext()

    useEffect(() => {
        editor.registerCommand(INSERT_ORDERED_LIST_COMMAND, () => {
            insertList(editor, 'number')
            return true
        }, COMMAND_PRIORITY_LOW)

        editor.registerCommand(INSERT_UNORDERED_LIST_COMMAND, () => {
            insertList(editor, 'bullet')
            return true
        }, COMMAND_PRIORITY_LOW)

        editor.registerCommand(INSERT_CHECK_LIST_COMMAND, () => {
            insertList(editor, 'check')
            return true
        }, COMMAND_PRIORITY_LOW)
    }, [])

    return null
}