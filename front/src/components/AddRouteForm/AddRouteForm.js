import React, { useCallback } from 'react';
import Constants from '../../Constants.json';

const fieldsDefaultState = {
    route: '/',
    title: ''
  };

const AddRouteForm = ({ onAddNode }) => {
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

    const nodeAddHandler = useCallback(() => {
        onAddNode(fieldsState.title, fieldsState.route);
        setFieldsState({ ...fieldsDefaultState });
    }, [fieldsState.route, fieldsState.title, onAddNode]);

    return(
        <div className="footer-block-child">
            <h2 className="block-info">{Constants.routeAddForm}</h2>
            <div className="route-add-from">
                <div>
                    <span>{Constants.title}</span>
                    <input className="input-v1" onChange={onTitleChanged} value={fieldsState.title} />
                </div>
                <div>
                    <span className='route-span'>{Constants.route}</span>
                    <input className='input-v1' onChange={onRouteChanged} value={fieldsState.route} />
                </div>
                <button className='button-v1 route-add-button' onClick={nodeAddHandler}>{Constants.addRoute}</button>
            </div>
        </div>
    );
};

export default AddRouteForm;