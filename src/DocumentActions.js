import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext"
import { getStorage, ref, uploadBytes } from "firebase/storage"
import {$generateHtmlFromNodes} from "@lexical/html"
import {
    MdOutlineCloudUpload,
    MdOutlineFileDownload,
    MdOutlineFileUpload
} from "react-icons/md"
import React, {useState} from "react"

export const DocumentActions = () => {
    const [editor] = useLexicalComposerContext()
    const [type, setType] = useState("firebase")

    const downloadHTMLFile = (data) => {
        const element = document.createElement("a")
        const file = new Blob([data], {type: 'text/html'})
        element.href = URL.createObjectURL(file)
        element.download = "myFile.html"
        // document.body.appendChild(element) // Required for this to work in FireFox
        element.click()
    }

    const uploadHTMLFirebase = (data) => {
        const file = new Blob([data], {type: 'text/html'})

        const storage = getStorage()
        const storageRef = ref(storage, 'test/testdoc.html')
        const metadata = {
            contentType: 'text/html'
        }

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, file, metadata).then((snapshot) => {
            console.log('Uploaded a blob or file!')
        })
    }

    const saveLocalSnapshot = () => {}

    const importHTML = () => {
        // do something
    }

    function listener() {
        editor.getEditorState().read(() => {
            const tmp = $generateHtmlFromNodes(editor)
            console.log(tmp)
            console.log(type)
            type === "firebase" ? uploadHTMLFirebase(tmp) : downloadHTMLFile(tmp)
        })
    }

    return (
        <div style={{display: "flex"}}>
            <button className="menu-item" onClick={() => {
                setType("firebase")
                listener()
            }}><MdOutlineCloudUpload/></button>
            <button className="menu-item" onClick={importHTML}><MdOutlineFileUpload/></button>
            <button className="menu-item" onClick={() => {
                setType("download")
                listener()
            }}><MdOutlineFileDownload/></button>
        </div>
    )
}