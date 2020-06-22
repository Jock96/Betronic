import * as types from '../../../store/tree/types';
import TreeHelper from '../../../helpers/TreeHelper';

export const addRoute = (title, route, fullParentRoute) => (dispatch, getState) => {
    const state = { ...getState() };
    const treeHelper = new TreeHelper(state.tree);
    const parentNode = treeHelper.findNode(fullParentRoute);

    if (!parentNode) {
        console.log('Parent node was not found');
        return;
    }

    if (parentNode.nodes.length === 2) {
        console.log('Only 2 child nodes allowed');
        return;
    }

    const hasNodeWithSameRoute = parentNode.nodes.some(({route: childRoute}) => childRoute === route);
    
    if (hasNodeWithSameRoute) {
        console.log('This node is already exists');
        return;
    }

    const childNode = {
        route,
        title,
        nodes: []
    };

    parentNode.nodes = [...parentNode.nodes, childNode];

    dispatch({
        type: types.CHANGE_TREE,
        payload: { ...state.tree }
    });
};

export const removeRoute = (route) => (dispatch, getState) => {
    const state = { ...getState() };
    const treeHelper = new TreeHelper(state.tree);
    const parentNode = treeHelper.findParentNode(route);

    const currentNode = parentNode.nodes.find(({route: childRoute}) => childRoute === route);
    
    if (!currentNode.nodes.length) {
        parentNode.nodes = parentNode.nodes.filter(({route: childRoute}) => childRoute !== route);
    }
    else {
        const parallelNode = parentNode.nodes.find(({route: childRoute}) => childRoute !== route);
        let candidateNode;

        if (parallelNode) {
            const firstNode = currentNode.nodes[0];
            const firstNodeRoute = firstNode.route;
            
            const mask = TreeHelper.getRouteMask(route, firstNodeRoute);
            const parallelNodeParentRoute = TreeHelper.getParentRoute(parallelNode.route);
            const parallelNodeMask = TreeHelper.getRouteMask(parallelNodeParentRoute, parallelNode.route);

            candidateNode = mask === parallelNodeMask ? currentNode.nodes[1] : firstNode;
        }
        else {
            candidateNode = currentNode.nodes[0];
        }

        const mask = TreeHelper.getRouteMask(parentNode.route, currentNode.route);
        TreeHelper.replaceRouteByMask(mask, candidateNode);

        parentNode.nodes = [...parentNode.nodes.filter(({route: childRoute}) => childRoute !== route), candidateNode];
    }

    dispatch({
        type: types.CHANGE_TREE,
        payload: { ...state.tree }
    });
};