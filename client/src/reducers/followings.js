import {GET_FOLLOWINGS, FOLLOW, UNFOLLOW} from '../actions/types';

const initialState = {
    followings: [],
    loading: true
}

const followings = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case GET_FOLLOWINGS:
            return {...state, followings: payload, loading: false};

        case FOLLOW:
            return {
                ...state,
                followings: [payload.following, ...state.followings]
            }

        case UNFOLLOW:
            return {
                ...state,
                followings: state.followings.filter(following => following.profile !== payload.following)
            }

        default:
            return state;
    }
}

export default followings;