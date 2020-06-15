class TreeHelper {
    constructor(tree) {
        this._tree = tree;
    }

    findNode(fullRoute) {
        const flattenTree = this.flatten();

        return flattenTree.find(({route}) => route === fullRoute);
    }

    findParentNode(route) {
        const normalizedRoute = route.substr(1);
        const chunks = normalizedRoute.split('/');
        const parentChunks = chunks.slice(0, -1);
        const parentRoute = `/${parentChunks.join('/')}`;

        return this.findNode(parentRoute);
    }

    flatten() {
        return TreeHelper.flatten(this._tree);
    }

    static flatten(tree) {
        const childNodes = tree.nodes
            .map(node => TreeHelper.flatten(node))
            .flat();

        return [tree, ...childNodes];
    }

    static _addParent(nodes, parent) {
        return nodes.map((node) => ({
            ...node,
            parent
        }));
    }

    static findChildNode(node, routeChunk) {
        return node.nodes.find(({route}) => route === `/${routeChunk}`);
    }
}

export default TreeHelper;