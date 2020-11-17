import {SET_CURRENT_USER, EDIT_PROFILE} from '../actions/types';

const initialState = {
    currentUser: {},
    isAuthenticated: false,
    loading: true
};

const auth = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case SET_CURRENT_USER:
            return {...state, currentUser: payload, isAuthenticated: !!Object.keys(payload).length, loading: false};

        case EDIT_PROFILE:
            return {...state, currentUser: {...state.currentUser, icon: payload.icon, bio: payload.bio, name: payload.name}}

        default:
            return state;
    }
}

export default auth;