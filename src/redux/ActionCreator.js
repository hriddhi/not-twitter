import * as ActionTypes from './ActionTypes';
import { POSTS } from '../shared/posts';
import { COMMENTS } from '../shared/comments';

export const fetchPosts = () => (dispatch) => {
    dispatch(postLoading(true));

    setTimeout(() => {
        dispatch(postSuccess(POSTS));
    }, 2000);
}

export const postLoading = () => ({
    type: ActionTypes.POST_LOADING
});

export const postFailed = (errmess) => ({
    type: ActionTypes.POST_FAILED,
    payload: errmess
});

export const postSuccess = (posts) => ({
    type: ActionTypes.POST_SUCCESS,
    payload: posts
});

//===============================================================

export const fetchComments = (id) => (dispatch) => {
    dispatch(commentsLoading(id));

    setTimeout(() => {
        dispatch(commentsSuccess(COMMENTS[id],id));
    }, 2000);
}

export const commentsLoading = (id) => ({
    type: ActionTypes.COMMENT_LOADING,
    id: id
});

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENT_FAILED,
    payload: errmess
});

export const commentsSuccess = (comments, id) => ({
    type: ActionTypes.COMMENT_SUCCESS,
    id: id,
    payload: comments
});

//===============================================================

export const postTweet = (tweet, username, name) => ({
    type: ActionTypes.POST_TWEET,
    payload: {
        tweet: tweet,
        username: username,
        name: name
    }
});

export const postComment = (userID, postID, comment, name, username) => ({
    type: ActionTypes.POST_COMMENT,
    payload: {
        userID: userID,
        postID: postID,
        comment: comment,
        name: name,
        username: username
    }
});

export const postLike = (userID, postID) => ({
    type: ActionTypes.POST_LIKE,
    payload: {
        userID: userID,
        postID: postID
    }
});