import axios from 'axios';
import {GET_TWEET, REPLY_TWEET, NEW_TWEET, DELETE_TWEET, DELETE_REPLY} from './types';
import {addAlert} from './alert';

// get tweet
export const getTweet = tweetId => async dispatch => {
    try {
        const res = await axios.get(`/api/tweet/${tweetId}`);

        dispatch({
            type: GET_TWEET,
            payload: res.data.tweet
        });
    } catch(err) {
        console.log(err.message);
    }
}

// create new tweet
export const newTweet = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/tweet', formData, config);

        dispatch({
            type: NEW_TWEET,
            payload: res.data.tweet
        });
    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(addAlert(error.msg)));
        }

        console.log(err);
    }
}

// reply tweet
export const replyTweet = (tweetId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post(`/api/tweet/${tweetId}/reply`, formData, config);

        dispatch({
            type: REPLY_TWEET,
            payload: res.data.reply
        });
    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(addAlert(error.msg)));
        }

        console.log(err.message);
    }
}

// delete tweet
export const deleteTweet = tweetId => async dispatch => {
    try {
        await axios.delete(`/api/tweet/${tweetId}`);

        dispatch({
            type: DELETE_TWEET,
            payload: tweetId
        });
    } catch(err) {
        console.log(err.message);
    }
}

// delete reply
export const deleteReply = (tweetId, replyId) => async dispatch => {
    try {
        await axios.delete(`/api/tweet/${tweetId}/reply/${replyId}`);

        dispatch({
            type: DELETE_REPLY,
            payload: replyId
        });
    } catch(err) {
        console.log(err.message);
    }
}