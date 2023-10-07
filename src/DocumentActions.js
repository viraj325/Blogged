import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext"
import {$generateHtmlFromNodes} from "@lexical/html"
import {MdOutlineFileDownload} from "react-icons/md"
import React from "react"

export const DocumentActions = () => {
    const [editor] = useLexicalComposerContext()

    const downloadTxtFile = (data) => {
        const element = document.createElement("a")
        const file = new Blob([data], {type: 'text/html'})
        element.href = URL.createObjectURL(file)
        element.download = "myFile.html"
        document.body.appendChild(element) // Required for this to work in FireFox
        element.click()
    }

    function listener() {
        editor.getEditorState().read(() => {
            const tmp = $generateHtmlFromNodes(editor)
            console.log(tmp)
            downloadTxtFile(tmp)
        })
    }

    return (
        <button className="menu-item" onClick={listener}><MdOutlineFileDownload/></button>
    )
}