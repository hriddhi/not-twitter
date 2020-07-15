import * as ActionTypes from './ActionTypes';
import produce from 'immer';

export const Login = produce((draft = {
    isLogging: true,
    errMess: null
}, action) => {
    switch(action.type){
        case ActionTypes.LOGIN_USER:
            draft.isLogging = true;
            draft.errMess = null;
            return;

        case ActionTypes.LOGIN_SUCCESS:
            draft.isLogging = false;
            draft.errMess = null;
            return;

        case ActionTypes.LOGIN_FAILED:
            draft.isLogging = false;
            draft.errMess = action.err;
            return;
    
        default:
            return draft;
    }
});