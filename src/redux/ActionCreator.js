import * as ActionTypes from './ActionTypes';
import { COMMENTS } from '../shared/comments';
import axios from 'axios';


export const loginUser = (user) => (dispatch) => {
    dispatch(loginLoading());

    axios.post('http://localhost:3001/login', {
        username: user.username,
        password: user.password
    })
    .then(res => {
        dispatch(loginSuccess());
        dispatch(createSession(res.data));
    })
    .catch(err => {
        dispatch(loginFailed());
    });
};

export const loginLoading = () => ({
    type: ActionTypes.LOGIN_USER
});

export const loginSuccess = () => ({
    type: ActionTypes.LOGIN_SUCCESS
});

export const loginFailed = () => ({
    type: ActionTypes.LOGIN_FAILED
});

export const createSession = (data) => ({
    type: ActionTypes.CREATE_SESSION,
    payload: data
})

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
        dispatch(registerSuccess());
    })
    .catch(err => {
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

//================================================

export const fetchProfile = (username) => (dispatch, getState) => {
    dispatch(fetchProfileLoading());

    axios.get('http://localhost:3001/profile/' + username,  {
        headers: {
            'Authorization': 'Bearer ' + getState().session.token
        }
    })
    .then(res => {
        dispatch(fetchProfileSuccess(res.data));
    })
    .catch(err => {
        dispatch(fetchProfileFailed(err));
    });
}

export const fetchProfileLoading = () => ({
    type: ActionTypes.PROFILE_LOADING
});

export const fetchProfileSuccess = (res) => ({
    type: ActionTypes.PROFILE_SUCCESS,
    payload: res
});

export const fetchProfileFailed = (err) => ({
    type: ActionTypes.PROFILE_FAILED
});

//====================================================

export const fetchPosts = () => (dispatch, getState) => {
    dispatch(postLoading(true));

    axios.get('http://localhost:3001/post/',  {
        headers: {
            'Authorization': 'Bearer ' + getState().session.token
        }
    })
    .then(res => {
        dispatch(postSuccess(res.data));
    })
    .catch(err => {
        dispatch(postFailed(err));
    });
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

export const fetchComments = (_id) => (dispatch, getState) => {
    dispatch(commentsLoading(_id));

    axios.get('http://localhost:3001/post/comment/' + _id,  {
        headers: {
            'Authorization': 'Bearer ' + getState().session.token
        }
    })
    .then(res => {
        dispatch(commentsSuccess(res.data));
    })
    .catch(err => {
        dispatch(commentsFailed(err));
    });
}

export const commentsLoading = (_id) => ({
    type: ActionTypes.COMMENT_LOADING,
    id: _id
});

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENT_FAILED,
    payload: errmess
});

export const commentsSuccess = (comments) => ({
    type: ActionTypes.COMMENT_SUCCESS,
    payload: comments
});

//===============================================================

export const postTweet = (tweet) => (dispatch, getState) => {

    axios.post('http://localhost:3001/post', { tweet }, {
        headers: {
            'Authorization': 'Bearer ' + getState().session.token
        }
    })
    .then(res => {
        dispatch(postTweetLocal(res.data));
        dispatch(postTweetSuccess());
    })
    .catch(err => {
        dispatch(postTweetFailed(err));
    });
}

export const postTweetLocal = (res) => ({
    type: ActionTypes.POST_TWEET,
    payload: res
});

export const postTweetSuccess = () => ({
    type: ActionTypes.POST_TWEET_SUCCESS
});

export const postTweetFailed = (errmess) => ({
    type: ActionTypes.POST_TWEET_FAILED,
    payload: errmess
});

//===============================================================

export const postComment = (postId, comment) => (dispatch, getState) => {

    dispatch(postCommentLoading());

    axios.post('http://localhost:3001/post/comment/' + postId, { comment }, {
        headers: {
            'Authorization': 'Bearer ' + getState().session.token
        }
    })
    .then(res => {
        dispatch(postCommentSuccess(res.data));
    })
    .catch(err => {
        dispatch(postCommentFailed(err));
    });
}

export const postCommentLoading = () => ({
    type: ActionTypes.POST_COMMENT_LOADING
});

export const postCommentSuccess = (res) => ({
    type: ActionTypes.POST_COMMENT_SUCCESS,
    payload: res
});

export const postCommentFailed = (errmess) => ({
    type: ActionTypes.POST_COMMENT_FAILED,
    payload: errmess
});

//==================================================

export const postLike = (postId) => (dispatch, getState) => {

    dispatch(postLikeLoading());

    axios.post('http://localhost:3001/post/like/' + postId, null , {
        headers: {
            'Authorization': 'Bearer ' + getState().session.token
        }
    })
    .then(res => {
        dispatch(postLikeSuccess(res.data, postId));
    })
    .catch(err => {
        dispatch(postLikeFailed(err));
    });
}

export const postLikeLoading = () => ({
    type: ActionTypes.POST_LIKE_LOADING
});

export const postLikeSuccess = (res, postId) => ({
    type: ActionTypes.POST_LIKE_SUCCESS,
    payload: res,
    postId: postId
});

export const postLikeFailed = (errmess) => ({
    type: ActionTypes.POST_LIKE_FAILED,
    payload: errmess
});