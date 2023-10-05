import {
    ElementNode,
    $createParagraphNode
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

    /**
     * * Node should be set to paragraph when user delete all content
     * */
    collapseAtStart(_) {
        const paragraph = $createParagraphNode();
        const children = this.getChildren();
        children.forEach((child) => paragraph.append(child));
        this.replace(paragraph);
        return true;
    }

    /**
     * Node should be set to paragraph when user press Enter.
     * Node will remain the same on Shift Enter
     * */
    insertNewAfter(_, restoreSelection) {
        const paragraph = $createParagraphNode();
        const direction = this.getDirection();
        paragraph.setDirection(direction);
        this.insertAfter(paragraph, restoreSelection);
        return paragraph;
    }

    static importJSON(_) {
        return new BannerNode()
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