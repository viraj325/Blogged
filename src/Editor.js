import React, {useMemo} from 'react'
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
import {CustomHeadingPlugin} from "./components/CustomHeadingPLugin"
import {BannerNode} from "./node/BannerNode"
import {CustomBannerPlugin} from "./components/CustomBannerPlugin"
import {CustomBannerActions} from "./components/CustomBannerActions"
import {$generateHtmlFromNodes} from "@lexical/html"
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext"
import './App.css'

export const Editor = () => {
    const CustomContent = useMemo(() => {
        return (
            <ContentEditable style={{
                position: 'relative',
                borderColor: 'rgba(255,211,2,0.68)',
                border: '2px solid red',
                borderRadius: '5px',
                maxWidth: '100%',
                padding: '10px'
            }}/>
        )
    }, []);

    const CustomPlaceholder = useMemo(() => {
        return (
            <div style={{
                position: 'absolute', top: 30, left: 30,
            }}>
                Enter some text...
            </div>
        )
    }, []);

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
        <div style={{padding: '20px'}}>
            <LexicalComposer initialConfig={lexicalConfig}>
                <RichTextPlugin
                    contentEditable={CustomContent}
                    placeholder={CustomPlaceholder}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin/>
                <OnChangePlugin/>
                <CustomHeadingPlugin/>
                <CustomHistoryActions/>
                <CustomBannerPlugin/>
                 <div style={{margin: '20px 0px'}}>
                     <CustomBannerActions/>
                     <CustomHeadingActions/>
                     <CustomTextActions/>
                     <CustomAlignActions/>
                 </div>
            </LexicalComposer>
            <button onClick={() => {
                //const htmlString = $generateHtmlFromNodes(editor, null)
                //console.log("htmlString \n " + htmlString)
            }}>
                Save!
            </button>
        </div>
    )
}