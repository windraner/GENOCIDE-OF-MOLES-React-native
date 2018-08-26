import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import thunk from 'redux-thunk';

export default function configureStore() {
    const store = createStore(
        reducer, 
        applyMiddleware(thunk)
    );

    return store;
}
