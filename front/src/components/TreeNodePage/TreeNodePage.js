import React from 'react';
import { useHistory } from 'react-router-dom';
import './TreeNodePageStyles.scss';
import Constants from '../../Constants.json';
import initialState from '../../modules/NavigationModule/redux/initialState';
import AddRouteForm from '../AddRouteForm/AddRouteForm';
import TreeHelper from '../../helpers/TreeHelper';
import LinksForm from '../LinksForm/LinksForm';
import clsx from 'clsx';
import { useMedia } from 'react-media';

const TreeNodePage = ({
    node,
    addRoute,
    removeRoute,
    isVk,
    isWa,
    isGl
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

    const isDesktop = useMedia({ query: "(min-width: 1430px)"});
    
    return (
        <div>
            <div className={clsx({'header-vk': isVk, 'header-wa': isWa, 'header-gl': isGl})}>
              <h1 className='header-info'>{Constants.nodeName}</h1>
              <div className='header-title'>{node.title}</div>
              {!isRoot && (
                <button className={`${clsx({'button-v1-vk': isVk, 'button-v1-wa': isWa, 'button-v1-gl': isGl})} header-button`} 
                        onClick={onGoToParent}>
                  {isDesktop ? Constants.goToParent : Constants.goToParentAdaptiveText}
                </button>
              )}
            </div>
            <div className='body-block'>
              <div className='func-block'>
                <AddRouteForm onAddNode={onAddNode} isVk={isVk} isGl={isGl} isWa={isWa} />
                <LinksForm node={node} removeRoute={removeRoute} isVk={isVk} isGl={isGl} isWa={isWa} />
              </div>
            </div>
        </div>
    );
};

export default TreeNodePage;