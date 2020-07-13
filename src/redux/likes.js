import { LIKES } from '../shared/likes';
import * as ActionTypes from './ActionTypes';

export const Likes = (state = LIKES, action) => {
    switch(action.type) {
        case ActionTypes.POST_LIKE:
            var like = action.payload;
            var newState = {...state};
            if(newState[like.postID] === undefined){
                var x = like.postID;
                newState[x] = [like.userID];
                console.log(newState);
                return {...newState};
            } else {
                if(newState[like.postID].includes(like.userID)){
                    newState[like.postID].splice(newState[like.postID].indexOf(like.userID), 1);
                } else {
                    newState[like.postID].push(like.userID);
                }
                console.log(newState);
                return {...newState};
            }

        default:
            return state;
    }
}