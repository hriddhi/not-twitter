import * as ActionTypes from './ActionTypes';
import produce from 'immer';

export const Register = produce((draft = {
    isRegistering: true,
    errMess: null
}, action) => {
    switch(action.type){
        case ActionTypes.REGISTER_USER:
            draft.isLoading = true;
            draft.errMess = null;
            return;

        case ActionTypes.REGISTER_SUCCESS:
            draft.isLoading = false;
            draft.errMess = null;
            return;

        case ActionTypes.REGISTER_FAILED:
            draft.isLoading = false;
            draft.errMess = action.err;
            return;
    
        default:
            return draft;
    }
});