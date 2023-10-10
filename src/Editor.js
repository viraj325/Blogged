import React, {useMemo, useState} from 'react'
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
import {HeadingNode} from "@lexical/rich-text"
import {CustomHeadingPlugin} from "./components/CustomHeadingPlugin"
import {BannerNode} from "./node/BannerNode"
import {CustomBannerPlugin} from "./components/CustomBannerPlugin"
import {CustomBannerActions} from "./components/CustomBannerActions"
import {DocumentActions} from "./DocumentActions"
import './App.css'
import './Toolbar.css'

export const Editor = () => {
    const [title, setTitle] = useState('Untitled')

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
            HeadingNode
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
            <div style={{textAlign: "center"}}>
                <input style={{textAlign: "center"}} className="title" type="text" id="title" name="title" value={title} onChange={(v) => {
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
            </LexicalComposer>
        </div>
    )
}