import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext"
import {$getSelection, $isRangeSelection, COMMAND_PRIORITY_NORMAL, createCommand} from "lexical"
import {
    $setBlocksType
} from "@lexical/selection"
import {BannerNode} from "../node/BannerNode";

export const $createBannerNode = () => new BannerNode()

export const INSERT_BANNER_COMMAND = createCommand("create_banner")

export const CustomBannerPlugin = () => {
    const [editor] = useLexicalComposerContext()

    if (!editor.hasNode(BannerNode)) {
        throw new Error('BannerPlugin: "BannerNode" not registered on editor')
    }
    editor.registerCommand(
        INSERT_BANNER_COMMAND,
        () => {
            const selection = $getSelection()
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, $createBannerNode)
            }
            return true
        },
        COMMAND_PRIORITY_NORMAL,
    )

    return null
}