import React from 'react';
import { Link } from 'react-router-dom';

const fieldsDefaultState = {
    route: '/',
    title: ''
  };

const TreeNodePage = ({
    node,
    addRoute,
    removeRoute
}) => {
    const [fieldsState, setFieldsState] = React.useState(fieldsDefaultState);

    const onTitleChanged = React.useCallback((e) => {
      const { value } = e.target;
  
      setFieldsState(state => ({
        ...state,
        title: value
      }));
    }, []);
  
    const onRouteChanged = React.useCallback((e) => {
      const { value } = e.target;
  
      setFieldsState(state => ({
        ...state,
        route: value.startsWith('/') ? value : `/${value}`
      }));
    }, []);
  
    const onAddNode = React.useCallback(() => {
      addRoute(fieldsState.title, `${node.route}${fieldsState.route}`, node.route);
      setFieldsState({ ...fieldsDefaultState });
    }, [addRoute, fieldsState, node.route]);

    return (
        <div>
            <div>{node.title}</div>
            <div>{node.route}</div>
            <div>
                <span>title</span>
                <input onChange={onTitleChanged} value={fieldsState.title} />
            </div>
            <div>
                <span>route</span>
                <input onChange={onRouteChanged} value={fieldsState.route} />
            </div>
            <div>
                <button onClick={onAddNode}>Add route</button>
            </div>
            {
                node.nodes.map((childNode) => (
                    <div key={childNode.route}>
                        <Link to={childNode.route}>{childNode.route}</Link>
                        <button onClick={() => removeRoute(childNode.route)}>Remove</button>
                    </div>
                ))
            }
        </div>
    );
};

export default TreeNodePage;