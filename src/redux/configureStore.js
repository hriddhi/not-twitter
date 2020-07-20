import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Posts } from './posts';
import { Comments } from './comments';
import { Register } from './registration';
import { Login } from './login'
import { Tweet } from './tweet';
import { Session } from './session'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Profile } from './profile';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            posts: Posts,
            comments: Comments,
            tweet: Tweet,
            profile: Profile,
            register: Register,
            login: Login,
            session: Session
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}