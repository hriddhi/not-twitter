import * as ActionTypes from './ActionTypes';
import produce from 'immer';

export const Profile = produce((draft = {
    data: [],
    user: {},
    isLoading: false,
    errMess: null
}, action) => {
    switch(action.type){
        case ActionTypes.PROFILE_LOADING:
            draft.data = [];
            draft.user = {};
            draft.isLoading = true;
            draft.errMess = null;
            return;

        case ActionTypes.PROFILE_SUCCESS:
            draft.isLoading = false;
            draft.errMess = null;
            draft.data = action.payload.data;
            draft.user = action.payload.user
            console.log(action.payload);
            return;
    
        default:
            return draft;
    }
});