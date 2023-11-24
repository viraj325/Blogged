import {MdOutlineCloudUpload, MdOutlineFileDownload, MdOutlineFileUpload} from "react-icons/md"
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext"
import {$generateHtmlFromNodes, $generateNodesFromDOM} from "@lexical/html"
import React, {useEffect, useRef, useState} from "react"
import {$getRoot, $insertNodes} from "lexical"
import {fetchMyDocument, uploadDocToFirebase} from "./FirebaseActions"

export const DocumentActions = ({title, tags, url}) => {
    const inputFile = useRef(null)
    const [editor] = useLexicalComposerContext()
    const [type, setType] = useState("firebase")
    const [showLoading, setShowLoading] = useState(false)

    useEffect(() => {
        console.log(url)
        if (url !== undefined && url !== null) {
            console.log("url is not null")
            fetchMyDocument(url, ((text) => {
                importHTML(text)
            })).then(r => console.log(r))
        } else {
            console.log("url is null")
        }
    }, [])

    const downloadHTMLFile = (data) => {
        const element = document.createElement("a")
        const file = new Blob([data], {type: 'text/html'})
        element.href = URL.createObjectURL(file)
        element.download = "blogged_temp_rename.html"
        // document.body.appendChild(element) // Required for this to work in FireFox
        element.click()
    }

    const saveLocalSnapshot = () => {
        // do something
    }

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
        inputFile.current.click()
    }

    const handleInputFileChange = (event) => {
        console.log("handle Input File Change")
        console.log(inputFile.current.files[0])
        const file = inputFile.current.files[0]
        const reader = new FileReader()
        reader.onload = function(e) {
            const content = reader.result
            alert(content)
            importHTML(content)
        }
        reader.readAsText(file)
    }

    function listener() {
        editor.getEditorState().read(() => {
            const tmp = $generateHtmlFromNodes(editor)
            console.log(tmp)
            console.log(type)
            if (type === "firebase") {
                // todo: make sure this works
                uploadDocToFirebase(title, tags, tmp, ((status) => {
                    setShowLoading(status)
                }))
            } else {
                downloadHTMLFile(tmp)
            }
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
            <input type='file' id='file' onChange={handleInputFileChange} ref={inputFile} style={{display: 'none'}}/>
        </div>
    )
}