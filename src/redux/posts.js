import * as ActionTypes from './ActionTypes';

export const Posts = (state = {
        isLoading: true,
        errMess: null,
        posts: []
    }, action) => {
    switch(action.type){

        case ActionTypes.POST_LOADING:
            return {...state, errMess: null, isLoading: true, posts: []}

        case ActionTypes.POST_FAILED:
            return {...state, isLoading: false, errMess: action.payload, posts: []}

        case ActionTypes.POST_SUCCESS:
            return {...state, isLoading: false, errMess: null, posts: action.payload}

        case ActionTypes.POST_TWEET:
            var post = action.payload;
            post.comments = [];
            var newState = {...state};
            post.id = newState.posts.length;
            newState.posts.unshift(post);
            return newState;
    
        default:
            return state;
    }
}