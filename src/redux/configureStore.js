import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Posts } from './posts';
import { Comments } from './comments';
import { Likes } from './likes';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            posts: Posts,
            comments: Comments,
            likes: Likes
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}