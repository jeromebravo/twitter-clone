import {TOGGLE_TWEET_POPUP, TOGGLE_REPLY_POPUP, TOGGLE_ACTIVITY_POPUP, TOGGLE_EDIT_POPUP} from './types';

// toggle tweet popup
export const toggleTweetPopup = () => dispatch => dispatch({type: TOGGLE_TWEET_POPUP});

// toggle reply popup
export const toggleReplyPopup = () => dispatch => dispatch({type: TOGGLE_REPLY_POPUP});

// toggle like or retweet popup
export const toggleActivityPopup = type => dispatch => dispatch({type: TOGGLE_ACTIVITY_POPUP, payload: type});

// toggle edit profile popup
export const toggleEditProfilePopup = () => dispatch => dispatch({type: TOGGLE_EDIT_POPUP});