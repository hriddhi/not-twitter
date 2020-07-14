import * as ActionTypes from './ActionTypes';
import { POSTS } from '../shared/posts';

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