import * as ActionTypes from './ActionTypes';
import { POSTS } from '../shared/posts';
import { COMMENTS } from '../shared/comments';
import axios from 'axios';


export const loginUser = (user) => (dispatch) => {
    dispatch(loginLoading());

    axios.post('http://localhost:3001/login', {
        username: user.username,
        password: user.password
    })
    .then(res => {
        console.log(res);
        dispatch(loginSuccess(res.data));
    })
    .catch(err => {
        console.log(err);
        dispatch(loginFailed());
    });
};

export const loginLoading = () => ({
    type: ActionTypes.REGISTER_USER
});

export const loginSuccess = (res) => ({
    type: ActionTypes.REGISTER_SUCCESS,
    payload: res
});

export const loginFailed = () => ({
    type: ActionTypes.REGISTER_FAILED
});

//================================================

export const registerUser = (user) => (dispatch) => {
    dispatch(registerLoading());

    axios.post('http://localhost:3001/signup', {
        username: user.username,
        password: user.password,
        name: user.name,
        dob: user.dob
    })
    .then(res => {
        console.log(res);
        dispatch(registerSuccess());
    })
    .catch(err => {
        console.log(err);
        dispatch(registerFailed());
    });
};

export const registerLoading = () => ({
    type: ActionTypes.REGISTER_USER
});

export const registerSuccess = () => ({
    type: ActionTypes.REGISTER_SUCCESS
});

export const registerFailed = () => ({
    type: ActionTypes.REGISTER_FAILED
});

//====================================================

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

export const postTweet = (tweet, username, name) => (dispatch) => {
    dispatch(postTweetLocal(tweet, username, name));

    setTimeout(() => {
        dispatch(postTweetSuccess());
    }, 2000);
}

export const postTweetLocal = (tweet, username, name) => ({
    type: ActionTypes.POST_TWEET,
    payload: {
        tweet: tweet,
        username: username,
        name: name
    }
});

export const postTweetSuccess = () => ({
    type: ActionTypes.POST_TWEET_SUCCESS
});

export const postTweetFailed = (errmess) => ({
    type: ActionTypes.POST_TWEET_FAILED,
    payload: errmess
});



//===============================================================

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