import {TOGGLE_TWEET_POPUP, TOGGLE_REPLY_POPUP, TOGGLE_ACTIVITY_POPUP, TOGGLE_EDIT_POPUP} from '../actions/types';

const initialState = {
    tweetPopup: false,
    replyPopup: false,
    editProfilePopup: false,
    activityPopup: {
        isActive: false,
        type: ''
    }
}

const popup = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case TOGGLE_TWEET_POPUP:
            return {...state, tweetPopup: !state.tweetPopup};

        case TOGGLE_REPLY_POPUP:
            return {...state, replyPopup: !state.replyPopup};

        case TOGGLE_ACTIVITY_POPUP:
            return {
                ...state,
                activityPopup: {
                    isActive: !state.activityPopup.isActive,
                    type: !state.activityPopup.isActive ? payload : ''
                }
            }

        case TOGGLE_EDIT_POPUP:
            return {...state, editProfilePopup: !state.editProfilePopup}

        default:
            return state;
    }
}

export default popup;