import {combineReducers} from 'redux';
import auth from './auth';
import alert from './alert';
import newsFeed from './newsFeed';
import popup from './popup';
import tweet from './tweet';
import likes from './likes';
import retweets from './retweets';
import explore from './explore';
import profile from './profile';
import followings from './followings';

const rootReducer = combineReducers({
    auth,
    alert,
    newsFeed,
    popup,
    tweet,
    likes,
    retweets,
    explore,
    profile,
    followings
});

export default rootReducer;