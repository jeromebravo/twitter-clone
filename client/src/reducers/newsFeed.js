import {GET_NEWS_FEED, NEW_TWEET, DELETE_TWEET, ADD_LIKE_TO_NEWSFEED, REMOVE_LIKE_TO_NEWSFEED, ADD_RETWEET_TO_NEWSFEED, REMOVE_RETWEET_TO_NEWSFEED, GET_PROFILE_TWEETS, EDIT_PROFILE} from '../actions/types';

const initialState = {
    tweets: [],
    loading: true
};

const newsFeed = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case GET_NEWS_FEED:
        case GET_PROFILE_TWEETS:
            return {...state, tweets: [...payload], loading: false};

        case NEW_TWEET:
            return {...state, tweets: [payload, ...state.tweets]};

        case ADD_LIKE_TO_NEWSFEED:
            return {
                ...state,
                tweets: state.tweets.map(tweet => {
                    if(tweet.tweet._id === payload.tweetId) {
                        tweet.tweet.likes = [{profile: payload.profile}, ...tweet.tweet.likes];
                        return tweet;
                    } else {
                        return tweet;
                    }
                })
            }

        case REMOVE_LIKE_TO_NEWSFEED:
            return {
                ...state,
                tweets: state.tweets.map(tweet => {
                    if(tweet.tweet._id === payload.tweetId) {
                        tweet.tweet.likes = tweet.tweet.likes.filter(like => like.profile !== payload.profile);
                        return tweet;
                    } else {
                        return tweet;
                    }
                })
            }

        case ADD_RETWEET_TO_NEWSFEED:
            return {
                ...state,
                tweets: [{...payload.tweet}, ...state.tweets.map(tweet => {
                    if(tweet.tweet._id === payload.tweetId) {
                        tweet.tweet.retweets = [{profile: payload.profile}, ...tweet.tweet.retweets];
                        return tweet;
                    } else {
                        return tweet;
                    }
                })]
            }

        case REMOVE_RETWEET_TO_NEWSFEED:
            return {
                ...state,
                tweets: state.tweets.filter(tweet => {
                    if(tweet.tweet._id === payload.tweetId && tweet.type === 'retweet') {
                        if(tweet.retweetedBy._id !== payload.profile) {
                            return tweet;
                        }
                    } else {
                        return tweet;
                    }
                }).map(tweet => {
                    if(tweet.tweet._id === payload.tweetId) {
                        tweet.tweet.retweets = tweet.tweet.retweets.filter(retweet => retweet.profile !== payload.profile);
                        return tweet;
                    } else {
                        return tweet;
                    }
                })
            }

        case DELETE_TWEET:
            return {
                ...state,
                tweets: state.tweets.filter(tweet => tweet.tweet._id !== payload)
            }

        case EDIT_PROFILE:
            return {
                ...state,
                tweets: state.tweets.map(tweet => {
                    if(tweet.tweet.profile._id === payload._id) {
                        tweet.tweet.profile.icon = payload.icon;
                        tweet.tweet.profile.name = payload.name;
                        return tweet;
                    } else {
                        return tweet
                    }
                })
            }

        default:
            return state;
    } 
}

export default newsFeed;