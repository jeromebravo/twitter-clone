import axios from 'axios';
import {GET_FOLLOWINGS, FOLLOW, UNFOLLOW} from './types';
import {v4} from 'uuid';

// get followings
export const getFollowings = () => async dispatch => {
    try {
        const res = await axios.get('/api/follow');

        dispatch({
            type: GET_FOLLOWINGS,
            payload: res.data.followings
        });
    } catch(err) {
        console.log(err.message);
    }
}

// follow or unfollow user
export const follow = (followed, profile, userId, profileId) => async dispatch => {
    try {
        await axios.put(`/api/follow/${userId}`);

        const id1 = v4();
        const id2 = v4();

        if(followed) {
            dispatch({
                type: UNFOLLOW,
                payload: {follower: profile._id, following: profileId}
            });
        } else {
            dispatch({
                type: FOLLOW,
                payload: {follower: {_id: id1, profile}, following: {_id: id2, profile: profileId}}
            });
        }
    } catch(err) {
        console.log(err.message);
    }
}