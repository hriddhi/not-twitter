import { LIKES } from '../shared/likes';
import * as ActionTypes from './ActionTypes';
import produce from 'immer';

export const Likes = produce((draft = LIKES, action) => {
    switch(action.type){
        case ActionTypes.POST_LIKE:
            var like = action.payload;
            if(draft[like.postID] === undefined){
                draft[like.postID] = [like.userID];
            } else {
                if(draft[like.postID].includes(like.userID)){
                    draft[like.postID].splice(draft[like.postID].indexOf(like.userID), 1);
                } else {
                    draft[like.postID].push(like.userID);
                }
            }
            return;
    
        default:
            return draft;
    }
});