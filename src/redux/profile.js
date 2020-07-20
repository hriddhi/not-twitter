import * as ActionTypes from './ActionTypes';
import produce from 'immer';

export const Profile = produce((draft = {
    data: null,
    replies: null,
    likes: null,
    user: {},
    isLoading: false,
    errMess: null,
    fetchUser: false,
    fetchedUser: null
}, action) => {
    switch(action.type){
        case ActionTypes.PROFILE_LOADING:
            draft.isLoading = 1;
            draft.errMess = null;
            draft.likes = null;
            draft.replies = null;
            return;

        case ActionTypes.PROFILE_SUCCESS:
            draft.isLoading = false;
            draft.errMess = null;
            draft.data = action.payload.data.reverse();
            draft.user = action.payload.user;
            return;

        case ActionTypes.PROFILE_REPLIES_LOADING:
            draft.isLoading = 2;
            draft.errMess = null;
            return;

        case ActionTypes.PROFILE_REPLIES_SUCCESS:
            draft.isLoading = false;
            draft.errMess = null;
            draft.replies = action.payload.replies.reverse();
            return;

        case ActionTypes.PROFILE_LIKES_LOADING:
            draft.isLoading = 3;
            draft.errMess = null;
            return;

        case ActionTypes.PROFILE_LIKES_SUCCESS:
            draft.isLoading = false;
            draft.errMess = null;
            draft.likes = action.payload.likes.reverse();
            return;

        case ActionTypes.FOLLOW_USER:
            console.log(action.payload);
            draft.user.followers = action.payload;
            return;

        case ActionTypes.FETCH_USER_DETAIL_LOADING:
            draft.fetchUser = true;
            return;

        case ActionTypes.FETCH_USER_DETAIL_SUCCESS:
            draft.fetchedUser = action.payload;
            draft.fetchUser = false;
            return;
    
        default:
            return draft;
    }
});