import * as ActionTypes from './ActionTypes';
import produce from 'immer';

export const Comments = produce((draft = 
    {
        isLoading: false,
        errMess: null,
        comments: {}
    }, action) => {
    switch(action.type){
        case ActionTypes.COMMENT_LOADING:
            draft.isLoading = true;
            draft.errMess = null;
            return;

        case ActionTypes.COMMENT_FAILED:
            draft.isLoading = false;
            draft.errMess = action.payload;
            return;

        case ActionTypes.COMMENT_SUCCESS:
            draft.isLoading = false;
            draft.errMess = null;
            draft[action.id] = action.payload;
            return;

        case ActionTypes.POST_COMMENT:
            var comment = action.payload;
            if(draft[comment.postID] === undefined){
                comment.id = 0;
                draft[comment.postID] = [ comment ];
                return;
            } else {
                comment.id = draft[comment.postID].length;
                draft[comment.postID].push(comment);
                return;
            }
    
        default:
            return draft;
    }
});