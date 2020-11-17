import {GET_PROFILE, EDIT_PROFILE, FOLLOW, UNFOLLOW} from '../actions/types';

const initialState = {
    profile: {},
    follows: {},
    likes: [],
    loading: true
}

const profile = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: payload.profile,
                follows: payload.follows,
                likes: payload.likes,
                loading: false
            };

        case EDIT_PROFILE:
            return {...state, profile: payload}

        case FOLLOW:
            return {
                ...state,
                follows: {
                    ...state.follows,
                    followers: [payload.follower, ...state.follows.followers]
                }
            }

        case UNFOLLOW:
            return {
                ...state,
                follows: {
                    ...state.follows,
                    followers: state.follows.followers.filter(follower => follower.profile._id !== payload.follower)
                }
            }

        default:
            return state;
    }
}

export default profile;