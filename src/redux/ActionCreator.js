import * as ActionTypes from './ActionTypes';

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
})