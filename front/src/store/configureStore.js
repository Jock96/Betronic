import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage';
import treeReducer from './tree/reducer';

const createRootReducer = () => combineReducers({
    tree: treeReducer
});

const configureStore = () => {
    const reducer = createRootReducer();
    const store = createStore(reducer, compose(
        applyMiddleware(thunk),
        persistState('tree'),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (x => x)
    ));

    return store;
}

export default configureStore;