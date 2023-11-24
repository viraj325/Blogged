import {$generateHtmlFromNodes} from "@lexical/html"

export const saveLocalSnapshot = (editor) => {
    const tmpHTML = $generateHtmlFromNodes(editor)
    // do something
    /* save the html */
}