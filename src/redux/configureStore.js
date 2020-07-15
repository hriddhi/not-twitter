import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Posts } from './posts';
import { Comments } from './comments';
import { Likes } from './likes';
import { Register } from './registration';
import { Login } from './login'
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            posts: Posts,
            comments: Comments,
            likes: Likes,
            register: Register,
            login: Login
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}