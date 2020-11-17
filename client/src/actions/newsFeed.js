import axios from 'axios';
import {GET_NEWS_FEED} from './types';

// get news feed
export const getNewsFeed = () => async dispatch => {
    try {
        const res = await axios.get('/api/newsfeed');

        dispatch({
            type: GET_NEWS_FEED,
            payload: res.data.tweetList
        });
    } catch(err) {
        console.log(err.message);
    }
}