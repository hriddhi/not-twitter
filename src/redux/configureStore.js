import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Posts } from './posts';
import { Comments } from './comments';
import { Likes } from './likes';
import { Register } from './registration';
import { Login } from './login'
import { Session } from './session'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Profile } from './profile';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            posts: Posts,
            comments: Comments,
            likes: Likes,
            profile: Profile,
            register: Register,
            login: Login,
            session: Session
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}