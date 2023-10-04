import React, {useMemo} from 'react';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin'
import {CustomHistoryActions} from "./CustomHistoryActions";
import {OnChangePlugin} from "./components/OnChangePlugin";
import {CustomTextActions} from "./components/CustomTextActions";
import {CustomAlignActions} from "./components/CustomAlignActions";
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
        },
        onError: (e) => {
            console.log('ERROR:', e)
        }
    }

    return (
        <div style={{padding: '20px'}}>
            <LexicalComposer initialConfig={lexicalConfig}>
                <RichTextPlugin
                    contentEditable={CustomContent}
                    placeholder={CustomPlaceholder}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <OnChangePlugin />
                <HistoryPlugin/>
                <CustomTextActions/>
                <CustomAlignActions/>
                <div style={{margin: '20px 0px'}}>
                    <CustomHistoryActions/>
                </div>
            </LexicalComposer>
        </div>
    )
}