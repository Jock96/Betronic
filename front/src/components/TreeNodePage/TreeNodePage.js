import React from 'react';
import { useHistory } from 'react-router-dom';
import './TreeNodePageStyles.scss';
import Constants from '../../Constants.json';
import initialState from '../../store/tree/initialState';
import AddRouteForm from '../AddRouteForm/AddRouteForm';
import TreeHelper from '../../helpers/TreeHelper';
import LinksForm from '../LinksForm/LinksForm';
import RouteTablecComponent from '../RouteTableComponent/RouteTableComponent';
import clsx from 'clsx';

const TreeNodePage = ({
    node,
    addRoute,
    removeRoute,
    flattenTree
}) => {
    const onAddNode = React.useCallback((title, route) => {
      addRoute(title, `${node.route}${route}`, node.route);
    }, [addRoute, node.route]);

    const history = useHistory();

    const isRoot = node.route === initialState.route;

    const onGoToParent = React.useCallback(() => {
      const parentRoute = TreeHelper.getParentRoute(node.route);
      history.push(parentRoute);
    }, [history, node.route]);

    const isVk = node.nodes.length === 0;
    const isWa = node.nodes.length === 1;
    const isGl = node.nodes.length >= 2;

    return (
        <div>
            <div className={clsx({'header-vk': isVk, 'header-wa': isWa, 'header-gl': isGl})}>
              <h1 className='header-info'>{Constants.nodeName}</h1>
              <div className='header-title'>{node.title}</div>
              {!isRoot && (
                <button className={clsx({'button-v1-vk': isVk, 'button-v1-wa': isWa, 'button-v1-gl': isGl})} onClick={onGoToParent}>
                  {Constants.goToParent}
                </button>
              )}
            </div>
            <div className='body-block'>
              <div className='func-block'>
                <AddRouteForm onAddNode={onAddNode} isVk={isVk} isGl={isGl} isWa={isWa} />
                <LinksForm node={node} removeRoute={removeRoute} isVk={isVk} isGl={isGl} isWa={isWa} />
              </div>
              <RouteTablecComponent flattenTree={flattenTree} removeRoute={removeRoute} isVk={isVk} isGl={isGl} isWa={isWa} />
            </div>
        </div>
    );
};

export default TreeNodePage;