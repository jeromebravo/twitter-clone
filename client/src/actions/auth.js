import axios from 'axios';
import {SET_CURRENT_USER} from './types';
import {addAlert} from './alert';
import setTokenHeader from '../utilities/setTokenHeader';

// set current user
const setCurrentUser = profile => dispatch => dispatch({
    type: SET_CURRENT_USER,
    payload: profile
});

// load user
export const loadUser = () => async dispatch => {
    try {
        const res = await axios.get('/api/user');
        dispatch(setCurrentUser(res.data.currentUser));
    } catch(err) {
        dispatch(logout());
    }
}

// register user
export const register = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post('/api/auth/signup', formData, config);

        // deconstruct res.data
        const {currentUser, token} = res.data;

        // set token in local storage
        localStorage.setItem('token', token);

        // set token in header
        setTokenHeader(token);

        // set current user in redux
        dispatch(setCurrentUser(currentUser));
    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(addAlert(error.msg)));
        }

        console.log(err.message);
    }
}

// login user
export const login = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post('/api/auth/login', formData, config);

        // deconstruct res.data
        const {currentUser, token} = res.data;

        // set token in local storage
        localStorage.setItem('token', token);

        // set token in header
        setTokenHeader(token);

        // set current user in redux
        dispatch(setCurrentUser(currentUser));
    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(addAlert(error.msg)));
        }

        console.log(err.message);
    }
}

// logout user
export const logout = () => dispatch => {
    // remove token in local storage
    localStorage.removeItem('token');

    // remove token in header
    setTokenHeader(false);

    // set current user into empty object
    dispatch(setCurrentUser({}));
}