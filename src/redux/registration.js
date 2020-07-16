import * as ActionTypes from './ActionTypes';
import produce from 'immer';

export const Register = produce((draft = {
    isRegistering: false,
    errMess: null
}, action) => {
    switch(action.type){
        case ActionTypes.REGISTER_USER:
            draft.isRegistering = true;
            draft.errMess = null;
            return;

        case ActionTypes.REGISTER_SUCCESS:
            draft.isRegistering = false;
            draft.errMess = null;
            return;

        case ActionTypes.REGISTER_FAILED:
            draft.isRegistering = false;
            draft.errMess = action.err;
            return;
    
        default:
            return draft;
    }
});