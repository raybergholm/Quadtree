import QuadtreeNode from "./quadtreeNode";

export const DEFAULT_MAX_ITEMS_IN_NODE = 5;
export const DEFAULT_MAX_LEVELS_IN_TREE = 5;

export default function Quadtree({
    bounds,
    divider,
    maxItemsInNode = DEFAULT_MAX_ITEMS_IN_NODE,
    maxLevelsInTree = DEFAULT_MAX_LEVELS_IN_TREE
}) {
    const attributesTemplate = {
        _root: null,
        maxItemsInNode: DEFAULT_MAX_ITEMS_IN_NODE,
        maxLevelsInTree: DEFAULT_MAX_LEVELS_IN_TREE
    };

    const attributes = Object.assign({}, attributesTemplate, {
        _root: new QuadtreeNode({
            bounds,
            divider,
            maxItemsInNode,
            maxLevelsInTree
        }),
        maxItemsInNode,
        maxLevelsInTree
    });

    const methods = {
        getBounds: getBounds,
        addItem: addItem,
        removeItem: removeItem,
        traverseTree: traverseTree,
        toString: toStringOverride
    };

    const debug = {
        _debug: {
            assert: _debugAssert
        }
    };

    Object.assign(this, attributes, methods, debug);
}

function getBounds() {
    return this._root.bounds;
}

function addItem(item) {
    this._root.addItem(item);
}

function removeItem(item) {
    this._root.removeItem(item);
}

function traverseTree(callback) {
    return this._root.each(callback);
}

function toStringOverride() {
    return JSON.stringify(this);
}

function _debugAssert() {
    return this.traverseTree((node) => {

    });
}