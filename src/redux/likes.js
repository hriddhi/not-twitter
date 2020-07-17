import { LIKES } from '../shared/likes';
import * as ActionTypes from './ActionTypes';
import produce from 'immer';

export const Likes = produce((draft = {
    isLoading: false,
    errMess: null,
    likes: {}
}, action) => {
    switch(action.type){
        

        default:
            return draft;
    }
});