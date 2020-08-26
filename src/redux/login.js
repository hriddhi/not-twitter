import * as ActionTypes from './ActionTypes';
import produce from 'immer';

export const Login = produce((draft = {
    isLoading: false,
    errMess: null
}, action) => {
    switch(action.type){
        case ActionTypes.LOGIN_USER:
            draft.isLoading = true;
            draft.errMess = null;
            return;

        case ActionTypes.LOGIN_SUCCESS:
            draft.isLoading = false;
            draft.errMess = null;
            return;

        case ActionTypes.LOGIN_FAILED:
            draft.isLoading = false;
            draft.errMess = action.payload.status + " " + action.payload.statusText;
            return;
    
        default:
            return draft;
    }
});