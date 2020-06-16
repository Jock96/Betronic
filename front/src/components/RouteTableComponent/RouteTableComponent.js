import React from 'react';
import Constants from '../../Constants.json';
import initialState from '../../store/tree/initialState';

const RouteTablecComponent = ({ flattenTree, removeRoute }) => {
    const onNodeDeleteFromTable = React.useCallback((route) => {
        removeRoute(route);
      }, [removeRoute]);

    return (
        <div>
            <h2 className='block-info'>{Constants.table}</h2>
            <div className='route-table'>
                <div className='route-table-header'>
                    <div className='route-table-cell'>{Constants.tableRoute}</div>
                    <div className='route-table-cell'>{Constants.tableTitle}</div>
                    <div className='route-table-cell'>{Constants.tableCount}</div>
                    <div className='route-table-cell'>{Constants.tableDelete}</div>
                </div>
                {flattenTree.map(({ route, title, nodes }) => (
                <div className='route-table-row'>
                    <div className='route-table-cell'>{route}</div>
                    <div className='route-table-cell'>{title}</div>
                    <div className='route-table-cell'>{nodes.length}</div>
                    {route !== initialState.route && 
                    <button className='button-v1 table-button' onClick={() => onNodeDeleteFromTable(route)}>
                        {Constants.remove}
                    </button>
                    }
                </div>
            ))}
            </div>
        </div>
    );
}

export default RouteTablecComponent;