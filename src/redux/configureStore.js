import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { Posts } from './posts';
import { Comments } from './comments';
import { Register } from './registration';
import { Login } from './login'
import { Tweet } from './tweet';
import { Session } from './session'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Profile } from './profile';
import expireReducer from 'redux-persist-expire';

const persistConfig = {
    key: 'session',
    storage: storage,
    whitelist: ['session'],
    blacklist: ['posts', 'comments', 'tweet', 'profile', 'register', 'login'],
    transforms: [
        expireReducer('session', {
            expireSeconds: 3600 * 24 * 30 
        })
    ]
};

const store = createStore(
    persistReducer(persistConfig,
        combineReducers({
            posts: Posts,
            comments: Comments,
            tweet: Tweet,
            profile: Profile,
            register: Register,
            login: Login,
            session: Session
        })
    ),
    applyMiddleware(thunk, logger)
);

const persistor = persistStore(store);

export { persistor, store };