import React from 'react';
import Constants from '../../Constants.json';
import initialState from '../../store/tree/initialState';
import './RouteTableComponentStyles.scss';
import { useMedia } from 'react-media';
import clsx from 'clsx';

const RouteTablecComponent = ({ flattenTree, removeRoute, isVk, isWa, isGl }) => {
    const isDesktop = useMedia({ query: "(min-width: 1430px)"});
    
    const onNodeDeleteFromTable = React.useCallback((route) => {
        removeRoute(route);
      }, [removeRoute]);

    return (
        <div>
            <h2 className={clsx({'block-info-vk': isVk, 'block-info-wa': isWa, 'block-info-gl': isGl})}>{Constants.table}</h2>
            <div className={clsx({'route-table-vk': isVk, 'route-table-wa': isWa, 'route-table-gl': isGl})}>
                <div className={clsx({'route-table-header-vk': isVk, 'route-table-header-wa': isWa, 'route-table-header-gl': isGl})}>
                    <div className='route-table-cell'>{Constants.tableRoute}</div>
                    <div className='route-table-cell'>{Constants.tableTitle}</div>
                    <div className='route-table-cell'>{Constants.tableCount}</div>
                    <div className='route-table-cell'>{Constants.tableDelete}</div>
                </div>
                {flattenTree.map(({ route, title, nodes }) => (
                <div className='route-table-row'>
                    <div className='route-table-cell route-cell'>{route}</div>
                    <div className='route-table-cell titel-cell'>{title}</div>
                    <div className='route-table-cell count-cell'>{nodes.length}</div>
                    {route !== initialState.route && 
                    <button className={`${clsx({'button-v1-vk': isVk, 'button-v1-wa': isWa, 'button-v1-gl': isGl})} table-button`} 
                            onClick={() => onNodeDeleteFromTable(route)}>
                                {isDesktop ? (Constants.remove) : (Constants.removeAdaptiveText)}
                    </button>
                    }
                </div>
            ))}
            </div>
        </div>
    );
}

export default RouteTablecComponent;