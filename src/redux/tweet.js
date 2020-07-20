import * as ActionTypes from './ActionTypes';
import produce from 'immer';

export const Tweet = produce((draft = {
    isLoading: false,
    commentLoading: false,
    likeLoading: false,
    errMess: null,
    commentErr: null,
    likeErr: null,
    post: null,
    comments: [],
    likes: []
}, action) => {
    switch(action.type){
        case ActionTypes.__FETCH_TWEET_LOADING:
            draft.isLoading = true;
            return;

        case ActionTypes.__FETCH_TWEET_FAILED:
            draft.isLoading = false;
            draft.errMess = action.payload;
            return;

        case ActionTypes.__FETCH_TWEET_SUCCESS:
            draft.isLoading = false;
            draft.post = action.payload.post;
            draft.comments = action.payload.comment;
            return;

        case ActionTypes.__COMMENT_LOADING:
            draft.commentLoading = true;
            return;

        case ActionTypes.__COMMENT_FAILED:
            draft.commentLoading = false;
            draft.commentErr = action.payload;
            return;

        case ActionTypes.__COMMENT_SUCCESS:
            draft.commentLoading = false;
            draft.commentErr = null;
            var comment = action.payload;
            draft.comments.push(comment);
            return;

        case ActionTypes.__LIKE_LOADING: 
            draft.likeLoading = true;
            draft.likeErr = null;
            return;

        case ActionTypes.__LIKE_FAILED:
            draft.likeLoading = false;
            draft.likeErr = action.payload;
            return;

        case ActionTypes.__LIKE_SUCCESS:
            draft.likeLoading = false;
            draft.likeErr = null;
            draft.post.like = action.payload;
            return;

        default:
            return draft;
    }
});