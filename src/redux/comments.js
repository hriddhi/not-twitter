import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

export const Comments = (state = COMMENTS, action) => {
    switch(action.type) {
        case ActionTypes.POST_COMMENT:
            var comment = action.payload;
            var newState = {...state};
            if(newState[comment.postID] === undefined){
                var x = comment.postID;
                comment.id = 0;
                newState[x] = [ comment ];
                console.log(newState);
                return {...newState};
            } else {
                comment.id = newState[comment.postID].length;
                newState[comment.postID].push(comment);
                console.log(newState);
                return {...newState};
            }

        default:
            return state;
    }
}