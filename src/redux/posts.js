import { POSTS } from '../shared/posts';
import * as ActionTypes from './ActionTypes';

export const Posts = (state = POSTS, action) => {
    switch(action.type){
        case ActionTypes.POST_TWEET:
            var post = action.payload;
            post.comments = [];
            post.id = state.length + 1;
            return state.concat(post);
    
        default:
            return state;
    }
}