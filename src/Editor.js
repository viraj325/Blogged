import React, {useMemo, useState} from 'react'
import {MdArrowBack, MdDriveFileRenameOutline, MdEmail, MdFolder, MdModeNight, MdShare} from "react-icons/md"
import {LexicalComposer} from '@lexical/react/LexicalComposer'
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin"
import {ContentEditable} from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin'
import {CustomHistoryActions} from "./components/CustomHistoryActions"
import {OnChangePlugin} from "./components/OnChangePlugin"
import {CustomTextActions} from "./components/CustomTextActions"
import {CustomAlignActions} from "./components/CustomAlignActions"
import {CustomHeadingActions} from "./components/CustomHeadingActions"
import {HeadingNode, QuoteNode} from "@lexical/rich-text"
import {CustomHeadingPlugin} from "./components/CustomHeadingPlugin"
import {CustomBannerPlugin} from "./components/CustomBannerPlugin"
import {CustomBannerActions} from "./components/CustomBannerActions"
import {DocumentActions} from "./DocumentActions"
import {BannerNode} from "./node/BannerNode"
import {useNavigate} from "react-router-dom"
import {IoMdCheckmark, IoMdTrash} from "react-icons/io"
import {ListActions} from "./components/ListActions"
import {ListItemNode, ListNode} from "@lexical/list"
import {ListPlugin} from "@lexical/react/LexicalListPlugin"
import './App.css'
import './Toolbar.css'

export const Editor = () => {
    let navigate = useNavigate()
    const [title, setTitle] = useState('Untitled')
    const [isTitleEditDisabled, setTitleEditDisabled] = useState(true)

    const CustomContent = useMemo(() => {
        return (
            <ContentEditable className="main-page"/>
            /*
            {{
                position: 'relative',
                borderColor: 'rgba(255,211,2,0.68)',
                border: '2px solid red',
                borderRadius: '5px',
                maxWidth: '100%',
                padding: '10px'
            }}
             */
        )
    }, []);

    /*const CustomPlaceholder = useMemo(() => {
        return (
            /*
            style={{
                position: 'absolute', top: 30, left: 30,
            }}

            <div >
                Enter some text...
            </div>
        )
    }, [])*/

    const lexicalConfig = {
        namespace: 'My Rich Text Editor',
        nodes: [
            BannerNode,
            HeadingNode,
            HeadingNode,
            ListNode,
            ListItemNode,
            QuoteNode,
            // CodeNode,
            // CodeHighlightNode,
            // TableNode,
            // TableCellNode,
            // TableRowNode,
            // AutoLinkNode,
            // LinkNode
        ],
        theme: {
            text: {
                bold: "text-bold",
                italic: "text-italic",
                underline: "text-underline",
                code: 'text-code',
                highlight: 'text-highlight',
                strikethrough: 'text-strikethrough',
                subscript: 'text-subscript',
                superscript: 'text-superscript',
            },
            heading: {
                h1: "text-5xl font-extrabold dark:text-white",
                h2: "text-4xl font-bold dark:text-white",
                h3: "text-3xl font-bold dark:text-white",
                h4: "text-2xl font-bold dark:text-white",
                h5: "text-xl font-bold dark:text-white",
            },
            banner: 'banner'
        },
        onError: (e) => {
            console.log('ERROR:', e)
        },
        // editorState: editor
    }

    return (
        <div className="main-div">
            <div className="main-header">
                <button className="circular-button" onClick={() => {
                    navigate("/")
                }}><MdArrowBack/></button>
                <input disabled={isTitleEditDisabled} style={{textAlign: "start"}} className="title" type="text" id="title" name="title" value={title} onChange={(v) => {
                    setTitle(v.target.value)
                    console.log("New Title: " + title)
                }}/>
            </div>

            <LexicalComposer initialConfig={lexicalConfig}>
                <div className="menu-bar">
                    <DocumentActions/>
                    <CustomHistoryActions/>
                    <CustomBannerActions/>
                    <CustomHeadingActions/>
                    <CustomTextActions/>
                    <CustomAlignActions/>
                    <ListActions/>
                </div>

                <RichTextPlugin
                    contentEditable={CustomContent}
                    placeholder={null}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin/>
                <OnChangePlugin/>
                <CustomHeadingPlugin/>
                <CustomBannerPlugin/>
                <ListPlugin/>
            </LexicalComposer>

            <div className="action-menu">
                <button className="action-button" title="Share"><MdShare/></button>
                <button className="action-button" title="Email"><MdEmail/></button>
                {
                    isTitleEditDisabled ?
                        <button className="action-button" title="Rename" onClick={() => {
                            setTitleEditDisabled(false)
                        }}><MdDriveFileRenameOutline/></button> :
                        <button className="action-button-active" title="Done" onClick={() => {
                            setTitleEditDisabled(true)
                        }}><IoMdCheckmark/></button>
                }
                <button className="action-button" title="Move to Folder"><MdFolder/></button>
                <button className="action-button" title="Turn on Dark Mode"><MdModeNight/></button>
                <button className="action-button" title="Delete"><IoMdTrash/></button>
                <button className="action-button">Metadata</button>
            </div>
        </div>
    )
}