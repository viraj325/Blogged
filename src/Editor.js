import {MdArrowBack, MdDriveFileRenameOutline, MdEmail, MdFolder, MdModeNight, MdShare} from "react-icons/md"
import {AutoLinkPlugin, createLinkMatcherWithRegExp} from '@lexical/react/LexicalAutoLinkPlugin'
import LexicalClickableLinkPlugin from "@lexical/react/LexicalClickableLinkPlugin"
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
import {LinkPlugin} from '@lexical/react/LexicalLinkPlugin'
import {AutoLinkNode, LinkNode} from '@lexical/link'
import {DocumentActions} from "./DocumentActions"
import {BannerNode} from "./node/BannerNode"
import {useNavigate} from "react-router-dom"
import {IoMdCheckmark, IoMdTrash} from "react-icons/io"
import {ListActions} from "./components/ListActions"
import {ListItemNode, ListNode} from "@lexical/list"
import {ListPlugin} from "@lexical/react/LexicalListPlugin"
import React, {useMemo, useState} from 'react'
import {CodeHighlightNode, CodeNode} from "@lexical/code"
import './App.css'
import './Toolbar.css'

const urlRegExp = new RegExp (
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/
)

const URL_REGEX = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/

const EMAIL_REGEX = /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/

const MATCHERS = [
   createLinkMatcherWithRegExp(URL_REGEX, (text) => {
      return text
   }),
   createLinkMatcherWithRegExp(EMAIL_REGEX, (text) => {
      return `mailto:${text}`
   })
]

export const Editor = (props) => {
    /*
    props should contain the following:
    - title
    - tags
    - url
     */
    let navigate = useNavigate()
    const [title, setTitle] = useState('Untitled')
    const [tags, setTags] = useState('null')
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
    }, [])

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
        namespace: "Viraj's Editor",
        nodes: [
            BannerNode,
            HeadingNode,
            HeadingNode,
            ListNode,
            ListItemNode,
            QuoteNode,
            LinkNode,
            AutoLinkNode,
            CodeNode,
            CodeHighlightNode,
            // ImageNode
            // TableNode,
            // TableCellNode,
            // TableRowNode
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
                <input disabled={isTitleEditDisabled} style={{textAlign: "start", width: "80%"}} className="title" type="text" id="title" name="title" value={title} onChange={(v) => {
                    setTitle(v.target.value)
                    console.log("New Title: " + title)
                }}/>
            </div>

            <LexicalComposer initialConfig={lexicalConfig}>
                <div className="menu-bar">
                    <DocumentActions title={title} tags={tags}/>
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
                <LinkPlugin validateUrl={validateUrl} />
                <AutoLinkPlugin matchers={MATCHERS} />
                <LexicalClickableLinkPlugin />
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

export function validateUrl(url) {
    return url === 'https://' || urlRegExp.test(url)
}