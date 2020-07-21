import * as ActionTypes from './ActionTypes';
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

export const logoutUser = () => (dispatch) => {
    dispatch(deleteSession());
};

export const deleteSession = () => ({
    type: ActionTypes.DELETE_SESSION
})

//================================================

export const registerUser = (user) => (dispatch) => {
    dispatch(registerLoading());

    axios.post('http://localhost:3001/signup', {
        username: user.username,
        password: user.password,
        name: user.firstname + " " + user.lastname,
        dob: user.dob,
        location: user.location
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

export const fetchProfileReplies = (username) => (dispatch, getState) => {
    dispatch(fetchProfileRepliesLoading());

    axios.get('http://localhost:3001/profile/replies/' + username,  {
        headers: {
            'Authorization': 'Bearer ' + getState().session.token
        }
    })
    .then(res => {
        dispatch(fetchProfileRepliesSuccess(res.data));
    })
    .catch(err => {
        dispatch(fetchProfileRepliesFailed(err));
    });
}

export const fetchProfileLikes = (username) => (dispatch, getState) => {
    dispatch(fetchProfileLikesLoading());

    axios.get('http://localhost:3001/profile/likes/' + username,  {
        headers: {
            'Authorization': 'Bearer ' + getState().session.token
        }
    })
    .then(res => {
        dispatch(fetchProfileLikesSuccess(res.data));
    })
    .catch(err => {
        dispatch(fetchProfileLikesFailed(err));
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

export const fetchProfileRepliesLoading = () => ({
    type: ActionTypes.PROFILE_REPLIES_LOADING
});

export const fetchProfileRepliesSuccess = (res) => ({
    type: ActionTypes.PROFILE_REPLIES_SUCCESS,
    payload: res
});

export const fetchProfileRepliesFailed = (err) => ({
    type: ActionTypes.PROFILE_REPLIES_FAILED
});

export const fetchProfileLikesLoading = () => ({
    type: ActionTypes.PROFILE_LIKES_LOADING
});

export const fetchProfileLikesSuccess = (res) => ({
    type: ActionTypes.PROFILE_LIKES_SUCCESS,
    payload: res
});

export const fetchProfileLikesFailed = (err) => ({
    type: ActionTypes.PROFILE_LIKES_FAILED
});

//====================================================

export const fetchUserDetails = (user) => (dispatch, getState) => {
    dispatch(_fetchUserDetailsLoading());

    axios.post('http://localhost:3001/user', {user}, {
        headers: {
            'Authorization': 'Bearer ' + getState().session.token,
            'user': user
        }
    })
    .then(res => {
        console.log(res.data);
        dispatch(_fetchUserDetailsSuccess(res.data));
    })
    .catch(err => {
        console.log(err);
    });
}
export const _fetchUserDetailsLoading = () => ({
    type: ActionTypes.FETCH_USER_DETAIL_LOADING
});

export const _fetchUserDetailsSuccess = (res) => ({
    type: ActionTypes.FETCH_USER_DETAIL_SUCCESS,
    payload: res
});

//====================================================

export const followUser = (id) => (dispatch, getState) => {
    axios.post('http://localhost:3001/user/follows/' + id, null, {
        headers: {
            'Authorization': 'Bearer ' + getState().session.token
        }
    })
    .then(res => {
        console.log(res.data);
        dispatch(followSuccess(res.data));
    })
    .catch(err => {
        console.log(err);
        //dispatch(postFailed(err));
    });
}

export const followSuccess = (res) => ({
    type: ActionTypes.FOLLOW_USER,
    payload: res
});

//====================================================

export const getUserSuggestion = () => (dispatch, getState) => {
    
    axios.get('http://localhost:3001/user/find', {
        headers: {
            'Authorization': 'Bearer ' + getState().session.token
        }
    })
    .then(res => {
        console.log(res.data);
        dispatch(getUserSuggestion_(res.data));
    })
    .catch(err => {
        console.log(err);
        //dispatch(postFailed(err));
    });
}

export const getUserSuggestion_ = (res) => ({
    type: ActionTypes.FETCH_USER_SUGGESTION,
    payload: res
});

//======================================================

export const postUserSuggestion = (id) => (dispatch, getState) => {
    
    axios.post('http://localhost:3001/user/follows/' + id, null, {
        headers: {
            'Authorization': 'Bearer ' + getState().session.token
        }
    })
    .then(res => {
        console.log(res.data);
        dispatch(postUserSuggestion_(id));
    })
    .catch(err => {
        console.log(err);
        //dispatch(postFailed(err));
    });
}

export const postUserSuggestion_ = (res) => ({
    type: ActionTypes.POST_USER_SUGGESTION,
    payload: res
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
        console.log(res.data);
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

    dispatch(postTweetLocal());

    axios.post('http://localhost:3001/post', { tweet }, {
        headers: {
            'Authorization': 'Bearer ' + getState().session.token
        }
    })
    .then(res => {
        dispatch(postTweetSuccess(res.data));
    })
    .catch(err => {
        dispatch(postTweetFailed(err));
    });
}

export const postTweetLocal = () => ({
    type: ActionTypes.POST_TWEET
});

export const postTweetSuccess = (res) => ({
    type: ActionTypes.POST_TWEET_SUCCESS,
    payload: res
});

export const postTweetFailed = (errmess) => ({
    type: ActionTypes.POST_TWEET_FAILED,
    payload: errmess
});

//===============================================================

export const postComment = (postId, username, comment) => (dispatch, getState) => {

    dispatch(postCommentLoading());

    axios.post('http://localhost:3001/post/comment/' + postId, { comment, username }, {
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

//=================================================

export const fetchTweet = (_id) => (dispatch, getState) => {
    dispatch(tweetLoading());

    axios.get('http://localhost:3001/tweet/' + _id,   {
        headers: {
            'Authorization': 'Bearer ' + getState().session.token
        }
    })
    .then(res => {
        console.log(res.data);
        dispatch(tweetSuccess(res.data));
    })
    .catch(err => {
        console.log(err);
        dispatch(tweetFailed(err));
    });
}

export const tweetLoading = () => ({
    type: ActionTypes.__FETCH_TWEET_LOADING
});

export const tweetFailed = (errmess) => ({
    type: ActionTypes.__FETCH_TWEET_FAILED,
    payload: errmess
});

export const tweetSuccess = (tweet) => ({
    type: ActionTypes.__FETCH_TWEET_SUCCESS,
    payload: tweet
});

export const __postComment = (_id, comment) => (dispatch, getState) => {
    dispatch(__postCommentLoading());

    axios.post('http://localhost:3001/tweet/comment/' + _id, {comment},  {
        headers: {
            'Authorization': 'Bearer ' + getState().session.token
        }
    })
    .then(res => {
        console.log(res.data);
        dispatch(__postCommentSuccess(res.data));
    })
    .catch(err => {
        console.log(err);
        dispatch(__postCommentFailed(err));
    });
}

export const __postCommentLoading = () => ({
    type: ActionTypes.__COMMENT_LOADING
});

export const __postCommentFailed = (errmess) => ({
    type: ActionTypes.__COMMENT_FAILED,
    payload: errmess
});

export const __postCommentSuccess = (tweet) => ({
    type: ActionTypes.__COMMENT_SUCCESS,
    payload: tweet
});

//===============================================

export const __postLike = (postId) => (dispatch, getState) => {
    dispatch(__postLikeLoading());

    axios.post('http://localhost:3001/tweet/like/' + postId, null , {
        headers: {
            'Authorization': 'Bearer ' + getState().session.token
        }
    })
    .then(res => {
        dispatch(__postLikeSuccess(res.data, postId));
    })
    .catch(err => {
        dispatch(__postLikeFailed(err));
    });
}

export const __postLikeLoading = () => ({
    type: ActionTypes.__LIKE_LOADING
});

export const __postLikeSuccess = (res, postId) => ({
    type: ActionTypes.__LIKE_SUCCESS,
    payload: res,
    postId: postId
});

export const __postLikeFailed = (errmess) => ({
    type: ActionTypes.__LIKE_FAILED,
    payload: errmess
});