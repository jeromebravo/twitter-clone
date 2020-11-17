import {GET_TWEET, REPLY_TWEET, DELETE_TWEET, ADD_LIKE_TO_TWEET,  REMOVE_LIKE_TO_TWEET, ADD_RETWEET_TO_TWEET, REMOVE_RETWEET_TO_TWEET, DELETE_REPLY} from '../actions/types';

const initialState = {
    tweet: {},
    loading: true
}

const tweet = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case GET_TWEET:
            return {...state, tweet: payload, loading: false};

        case REPLY_TWEET:
            return {
                ...state,
                tweet: {...state.tweet, replies: [payload, ...state.tweet.replies]}
            }

        case ADD_LIKE_TO_TWEET:
            return {
                ...state,
                tweet: {...state.tweet, likes: [payload, ...state.tweet.likes]}
            }

        case REMOVE_LIKE_TO_TWEET:
            return {
                ...state,
                tweet: {...state.tweet, likes: state.tweet.likes.filter(like => like.profile._id !== payload)}
            }

        case ADD_RETWEET_TO_TWEET:
            return {
                ...state,
                tweet: {...state.tweet, retweets: [payload, ...state.tweet.retweets]}
            }

        case REMOVE_RETWEET_TO_TWEET:
            return {
                ...state,
                tweet: {...state.tweet, retweets: state.tweet.retweets.filter(retweet => retweet.profile._id !== payload)}
            }

        case DELETE_TWEET:
            return {...state, tweet: {}, loading: true}

        case DELETE_REPLY:
            return {...state, tweet: {...state.tweet, replies: state.tweet.replies.filter(reply => reply._id !== payload)}}

        default:
            return state;
    }
}

export default tweet;