import * as ActionTypes from './ActionTypes';
import produce from 'immer';

export const Session = produce((draft = {
    session: false,
    token: null,
    errMess: null
}, action) => {
    switch(action.type){
        case ActionTypes.CREATE_SESSION:
            draft.session = true;
            draft.token = action.payload.token;
            draft.user = action.payload.user;
            draft.errMess = null;
            return;

        case ActionTypes.DELETE_SESSION:
            draft.isLoading = false;
            draft.errMess = null;
            return;
    
        default:
            return draft;
    }
});