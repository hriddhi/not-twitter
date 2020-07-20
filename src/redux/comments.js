import * as ActionTypes from './ActionTypes';
import produce from 'immer';

export const Comments = produce((draft = 
    {
        isLoading: false,
        isPosting: false,
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
            if(action.payload[0] === undefined)
                return;
            console.log(action.payload);
            var id = action.payload[0].repliedTo.split('$');
            draft.comments[id[0]] = action.payload;
            return;

        case ActionTypes.POST_COMMENT_LOADING: 
            draft.isPosting = true;
            draft.errMess = null;
            return;

        case ActionTypes.POST_COMMENT_FAILED:
            draft.isPosting = false;
            draft.errMess = action.payload;
            return;

        case ActionTypes.POST_COMMENT_SUCCESS:
            draft.isPosting = false;
            draft.errMess = null;
            var comment = action.payload;
            var _id = comment.repliedTo.split('$');
            if(draft.comments[_id[0]] === undefined){
                draft.comments[_id[0]] = [ comment ];
                return;
            } else {
                draft.comments[_id[0]].push(comment);
                return;
            }
    
        default:
            return draft;
    }
});