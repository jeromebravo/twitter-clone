import {GET_RETWEETS, REMOVE_RETWEET, DELETE_TWEET, RETWEET} from '../actions/types';

const initialState = {
    retweets: [],
    loading: true
}

const retweets = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case GET_RETWEETS:
            return {...state, retweets: [...payload], loading: false};

        case RETWEET:
            return {...state, retweets: [payload, ...state.retweets]};

        case REMOVE_RETWEET:
        case DELETE_TWEET:
            return {...state, retweets: state.retweets.filter(retweet => retweet.tweet !== payload)};

        default:
            return state;
    }
}

export default retweets;