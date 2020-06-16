import React, { useCallback } from 'react';
import Constants from '../../Constants.json';

const fieldsDefaultState = {
    route: '/',
    title: ''
  };

const AddRouteForm = ({ onAddNode }) => {
    const [fieldsState, setFieldsState] = React.useState(fieldsDefaultState);

    const onTitleChanged = React.useCallback((e) => {
      let { value } = e.target;

      if (value.length > Constants.inputMaxValue) {
        value = e.target.value.slice(0, Constants.inputMaxValue);
      }
  
      setFieldsState(state => ({
        ...state,
        title: value
      }));
    }, []);
  
    const onRouteChanged = React.useCallback((e) => {
      let { value } = e.target;

      if (value.endsWith('/') || value.endsWith('\\'))
        return;

      if (value.length > Constants.inputMaxValue) {
        value = e.target.value.slice(0, Constants.inputMaxValue);
      }
  
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
        <div className="func-block-child">
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
                <button 
                  className='button-v1 route-add-button' 
                  disabled={fieldsState.route.trim() === '/' || !fieldsState.title.length}
                  onClick={nodeAddHandler}>
                    {Constants.addRoute}
                </button>
            </div>
        </div>
    );
};

export default AddRouteForm;