import * as types from './types';
import TreeHelper from '../../helpers/TreeHelper';

export const addRoute = (title, route, fullParentRoute) => (dispatch, getState) => {
    const state = { ...getState() };
    const treeHelper = new TreeHelper(state.tree);
    const parentNode = treeHelper.findNode(fullParentRoute);

    if (!parentNode) {
        console.log('Parent node was not found');
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

    parentNode.nodes = parentNode.nodes.filter(({route: childRoute}) => childRoute !== route);

    dispatch({
        type: types.CHANGE_TREE,
        payload: { ...state.tree }
    });
};