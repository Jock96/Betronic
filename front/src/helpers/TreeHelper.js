class TreeHelper {
    constructor(tree) {
        this._tree = tree;
    }

    findNode(fullRoute) {
        const flattenTree = this.flatten();

        return flattenTree.find(({route}) => route === fullRoute);
    }

    findParentNode(route) {
        const parentRoute = TreeHelper.getParentRoute(route);
        return this.findNode(parentRoute);
    }

    flatten() {
        return TreeHelper.flatten(this._tree);
    }

    static getParentRoute(route) {
        const normalizedRoute = route.substr(1);
        const chunks = normalizedRoute.split('/');
        const parentChunks = chunks.slice(0, -1);
        return `/${parentChunks.join('/')}`;
    }

    static getRouteMask(parentRoute, currentRoute) {
        const firstNodeWithoutCurrent = currentRoute.replace(parentRoute, '');
        const indexOfMaskEnd  = firstNodeWithoutCurrent.indexOf('/', 1);
        return indexOfMaskEnd === -1 ? firstNodeWithoutCurrent.slice(0) : firstNodeWithoutCurrent.slice(0, indexOfMaskEnd);
    }

    static replaceRouteByMask(mask, node) {
        if (node.nodes.length) {
            debugger;
            node.nodes.forEach((innerNode) => TreeHelper.replaceRouteByMask(mask, innerNode));
        }

        node.route = node.route.replace(mask, '');
    }

    static flatten(tree) {
        const childNodes = tree.nodes
            .map(node => TreeHelper.flatten(node))
            .flat();

        return [tree, ...childNodes];
    }
}

export default TreeHelper;