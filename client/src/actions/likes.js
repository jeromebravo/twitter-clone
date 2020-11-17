import axios from 'axios';
import {GET_LIKES, REMOVE_LIKE, ADD_LIKE, ADD_LIKE_TO_NEWSFEED, REMOVE_LIKE_TO_NEWSFEED, ADD_LIKE_TO_TWEET, REMOVE_LIKE_TO_TWEET} from './types';
import {v4} from 'uuid';

// get all liked tweet
export const getLikes = () => async dispatch => {
    try {
        const res = await axios.get('/api/like');

        dispatch({
            type: GET_LIKES,
            payload: res.data.likes
        });
    } catch(err) {
        console.log(err.message);
    }
}

// like or unlike tweet
export const likeTweet = (tweetId, liked) => async dispatch => {
    try {
        const res = await axios.put(`/api/tweet/${tweetId}/like`);
        
        const tweet = await axios.get(`/api/tweet/${tweetId}`);

        const _id = v4();

        if(liked) {
            dispatch({
                type: REMOVE_LIKE_TO_NEWSFEED,
                payload: {profile: res.data.profile._id, tweetId}
            });

            dispatch({
                type: REMOVE_LIKE,
                payload: tweet.data.tweet._id
            });

            dispatch({
                type: REMOVE_LIKE_TO_TWEET,
                payload: res.data.profile._id
            })
        } else {
            dispatch({
                type: ADD_LIKE_TO_NEWSFEED,
                payload: {profile: res.data.profile._id, tweetId}
            });

            dispatch({
                type: ADD_LIKE,
                payload: {_id, tweet: tweet.data.tweet}
            });

            dispatch({
                type: ADD_LIKE_TO_TWEET,
                payload: res.data
            });
        }
    } catch(err) {
        console.log(err.message);
    }
}