import * as ActionTypes from './ActionTypes';
import produce from 'immer';

export const Posts = produce((draft = {
    isLoading: false,
    isPosting: null,
    errMess: null,
    posts: []
}, action) => {
    switch(action.type){
        case ActionTypes.POST_LOADING:
            draft.isLoading = true;
            draft.errMess = null;
            draft.posts = [];
            return;

        case ActionTypes.POST_FAILED:
            draft.isLoading = false;
            draft.errMess = action.payload;
            draft.posts = [];
            return;

        case ActionTypes.POST_SUCCESS:
            draft.isLoading = false;
            draft.errMess = null;
            draft.posts = action.payload;
            return;

        case ActionTypes.POST_TWEET:    
            var post = action.payload;
            post.comments = [];
            post.id = draft.posts.length;
            draft.posts.unshift(post);
            draft.isPosting = post.id;
            return;

        case ActionTypes.POST_TWEET_SUCCESS:
            draft.isPosting = null;
            return;
    
        default:
            return draft;
    }
});