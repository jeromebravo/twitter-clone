import axios from 'axios';
import {GET_USERS} from './types';

// get users
export const getUsers = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post('/api/search', formData, config);

        dispatch({
            type: GET_USERS,
            payload: res.data.users
        });
    } catch(err) {
        console.log(err.message);
    }
}