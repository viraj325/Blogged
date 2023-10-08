import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext"
import { getStorage, ref, uploadBytes } from "firebase/storage"
import {$generateHtmlFromNodes, $generateNodesFromDOM} from "@lexical/html"
import {
    MdOutlineCloudUpload,
    MdOutlineFileDownload,
    MdOutlineFileUpload
} from "react-icons/md"
import React, {useRef, useState} from "react"
import {$getRoot, $insertNodes} from "lexical"

export const DocumentActions = () => {
    const inputFile = useRef(null)
    const [editor] = useLexicalComposerContext()
    const [type, setType] = useState("firebase")
    const [showLoading, setShowLoading] = useState(false)

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
            setShowLoading(false)
        })
    }

    const saveLocalSnapshot = () => {}

    const importHTML = (data) => {
        editor.update(() => {
            // In the browser you can use the native DOMParser API to parse the HTML string.
            const parser = new DOMParser()
            const dom = parser.parseFromString(data, 'text/html')

            // Once you have the DOM instance it's easy to generate LexicalNodes.
            const nodes = $generateNodesFromDOM(editor, dom)

            // Select the root
            $getRoot().select()

            // Insert them at a selection.
            $insertNodes(nodes)
        })
    }

    const onButtonClick = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
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
            {
                showLoading ? <button style={{transition: '0.3s'}} className="menu-item">Syncing</button> :
                <button style={{transition: '0.3s'}} className="menu-item" onClick={() => {
                    setShowLoading(true)
                    setType("firebase")
                    listener()
                }}><MdOutlineCloudUpload/></button>
            }
            <button className="menu-item" onClick={onButtonClick}><MdOutlineFileUpload/></button>
            <button className="menu-item" onClick={() => {
                setType("download")
                listener()
            }}><MdOutlineFileDownload/></button>
            <input type='file' id='file' ref={inputFile} style={{display: 'none'}}/>
        </div>
    )
}