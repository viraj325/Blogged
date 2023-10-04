import {
    ElementNode
} from "lexical"

export class BannerNode extends ElementNode {
    createDOM(_config, _editor) {
        const div = document.createElement("div")
        div.className = _config.theme.banner
        return div
    }

    static clone(node) {
        return new BannerNode(node.__key)
    }

    static getType() {
        return "banner";
    }

    /**
     * Returning false tells Lexical that this node does not need its
     * DOM element replacing with a new copy from createDOM.
     */
    updateDOM(_prevNode, _dom, _config,) {
        return false
    }

    exportJSON() {
        return {
            type: "banner",
            version: 1,
            children: [],
            customValue: "anything you like",
            format: "",
            indent: 1,
            direction: null,
        }
    }
}