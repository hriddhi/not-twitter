import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';
import produce from 'immer';

export const Comments = produce((draft = COMMENTS, action) => {
    switch(action.type){
        case ActionTypes.POST_COMMENT:
            var comment = action.payload;
            if(draft[comment.postID] === undefined){
                var x = comment.postID;
                comment.id = 0;
                draft[x] = [ comment ];
                return draft;
            } else {
                comment.id = draft[comment.postID].length;
                draft[comment.postID].push(comment);
                return draft;
            }
    
        default:
            return draft;
    }
});