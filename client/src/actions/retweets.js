import axios from 'axios';
import {GET_RETWEETS, RETWEET, REMOVE_RETWEET, REMOVE_RETWEET_TO_NEWSFEED, ADD_RETWEET_TO_NEWSFEED, ADD_RETWEET_TO_TWEET, REMOVE_RETWEET_TO_TWEET} from './types';

// get all retweeted tweet
export const getRetweets = () => async dispatch => {
    try {
        const res = await axios.get('/api/retweet');

        dispatch({
            type: GET_RETWEETS,
            payload: res.data.retweets
        });
    } catch(err) {
        console.log(err.message);
    }
}

// retweet or undo retweet
export const retweetTweet = (tweetId, retweeted, profile) => async dispatch => {
    try {
        const res = await axios.put(`/api/tweet/${tweetId}/retweet`);

        if(retweeted) {
            dispatch({
                type: REMOVE_RETWEET_TO_NEWSFEED,
                payload: {profile: res.data.retweet.retweetedBy._id, tweetId}
            });

            dispatch({
                type: REMOVE_RETWEET,
                payload: tweetId
            });

            dispatch({
                type: REMOVE_RETWEET_TO_TWEET,
                payload: profile._id
            })
        } else {
            dispatch({
                type: ADD_RETWEET_TO_NEWSFEED,
                payload: {tweet: res.data.retweet, profile: res.data.retweet.retweetedBy._id, tweetId}
            });

            dispatch({
                type: RETWEET,
                payload: {tweet: tweetId}
            });

            dispatch({
                type: ADD_RETWEET_TO_TWEET,
                payload: {profile}
            });
        }
    } catch(err) {
        console.log(err.message);
    }
}