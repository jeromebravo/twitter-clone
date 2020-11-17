import axios from 'axios';
import {GET_PROFILE, GET_PROFILE_TWEETS, EDIT_PROFILE} from './types';

// get profile
export const getProfile = userId => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/${userId}`);

        const {profile, follows, tweets, likes} = res.data;

        dispatch({
            type: GET_PROFILE,
            payload: {profile, follows, likes}
        });

        dispatch({
            type: GET_PROFILE_TWEETS,
            payload: tweets
        });
    } catch(err) {
        console.log(err.message);
    }
}

// edit profile
export const editProfile = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.put('/api/profile', formData, config);

        dispatch({
            type: EDIT_PROFILE,
            payload: res.data.profile
        });
    } catch(err) {
        console.log(err.message);
    }
}