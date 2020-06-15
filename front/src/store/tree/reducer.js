import * as types from './types';
import initialState from './initialState';

const reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.CHANGE_TREE:
            return {
                ...payload
            };

        default:
            return { ...state }; 
    }
};

export default reducer;