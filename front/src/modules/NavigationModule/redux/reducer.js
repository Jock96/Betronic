import * as types from '../../../store/tree/types';
import initialState from '../../../store/tree/initialState';

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