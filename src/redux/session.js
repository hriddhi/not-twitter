import * as ActionTypes from './ActionTypes';
import produce from 'immer';

export const Session = produce((draft = {
    session: false,
    token: null,
    errMess: null,
    user_suggestion: null
    }, action) => {
    switch(action.type){
        case ActionTypes.CREATE_SESSION:
            draft.session = true;
            draft.token = action.payload.token;
            draft.user = action.payload.user;
            draft.errMess = null;
            return;

        case ActionTypes.DELETE_SESSION:
            draft.session = false;
            draft.token = null;
            return;

        case ActionTypes.FETCH_USER_SUGGESTION:
            draft.user_suggestion = action.payload;
            return;

        case ActionTypes.POST_USER_SUGGESTION:
            var i = action.payload;
            var temp = draft.user_suggestion.filter((val) => i !== val._id);
            console.log(temp);
            draft.user_suggestion = temp;
            return;
    
        default:
            return draft;
    }
});