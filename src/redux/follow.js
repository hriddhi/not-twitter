import * as ActionTypes from './ActionTypes';
import produce from 'immer';

export const Follow = produce((draft = {
    isLoading: false,
    errMess: null,
    user: null
}, action) => {
    switch(action.type){
        case ActionTypes.FOLLOW_USER_HOME_SUCCESS:
            draft.isLoading = true;
            draft.errMess = null;
            draft.user = action.payload;
            return;

        case ActionTypes.FOLLOW_USER_HOME_FAILED:
            draft.isLoading = false;
            draft.errMess = null;
            return;

        default:
            return draft;
    }
});