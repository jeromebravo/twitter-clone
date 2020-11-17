import {GET_LIKES, ADD_LIKE, REMOVE_LIKE, DELETE_TWEET, ADD_RETWEET_TO_NEWSFEED, REMOVE_RETWEET_TO_NEWSFEED} from '../actions/types';

const initialState = {
    likes: [],
    loading: true
}

const likes = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case GET_LIKES:
            return {...state, likes: [...payload], loading: false};

        case ADD_LIKE:
            return {...state, likes: [payload, ...state.likes]};

        case REMOVE_LIKE:
        case DELETE_TWEET:
            return {...state, likes: state.likes.filter(like => like.tweet._id !== payload)};

        case ADD_RETWEET_TO_NEWSFEED:
            return {
                ...state,
                likes: state.likes.map(like => {
                    if(like.tweet._id === payload.tweetId) {
                        like.tweet.retweets = [{profile: payload.profile}, ...like.tweet.retweets];
                        return like;
                    } else {
                        return like
                    }
                })
            }

        case REMOVE_RETWEET_TO_NEWSFEED:
            return {
                ...state,
                likes: state.likes.map(like => {
                    if(like.tweet._id === payload.tweetId) {
                        like.tweet.retweets = like.tweet.retweets.filter(retweet => retweet.profile !== payload.profile);
                        return like;
                    } else {
                        return like;
                    }
                })
            }

        default:
            return state;
    }
}

export default likes;