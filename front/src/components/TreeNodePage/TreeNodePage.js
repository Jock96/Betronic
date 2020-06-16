import React from 'react';
import { useHistory } from 'react-router-dom';
import './TreeNodePageStyles.scss';
import Constants from '../../Constants.json';
import initialState from '../../store/tree/initialState';
import AddRouteForm from '../AddRouteForm/AddRouteForm';
import TreeHelper from '../../helpers/TreeHelper';
import LinksForm from '../LinksForm/LinksForm';
import RouteTablecComponent from '../RouteTableComponent/RouteTableComponent';

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

    return (
        <div>
            <div className='header'>
              <h1 className='header-info'>{Constants.nodeName}</h1>
              <div className='header-title'>{node.title}</div>
              {!isRoot && (
                <button className='button-v1' onClick={onGoToParent}>
                  {Constants.goToParent}
                </button>
              )}
            </div>
            <div className='body-block'>
              <div className='func-block'>
                <AddRouteForm onAddNode={onAddNode} />
                <LinksForm node={node} removeRoute={removeRoute} />
              </div>
              <RouteTablecComponent flattenTree={flattenTree}/>
            </div>
        </div>
    );
};

export default TreeNodePage;