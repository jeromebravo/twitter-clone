import React, {useEffect} from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {removeAlert} from '../actions/alert';
import LandingPage from './layout/LandingPage';
import Signup from './auth/Signup';
import Login from './auth/Login';
import Home from './homepage/Home';
import TweetPage from './Tweet/TweetPage';
import ExplorePage from './explore/ExplorePage';
import ProfilePage from './profile/ProfilePage';
import Follow from './follow/Follow';
import {getLikes} from '../actions/likes';
import {getRetweets} from '../actions/retweets';
import {getFollowings} from '../actions/followings';
const Main = ({history, removeAlert, getLikes, getRetweets, getFollowings}) => {
    useEffect(() => {
        history.listen(() => removeAlert());
    }, [history]);

    useEffect(() => {
        getLikes();
        getRetweets();
        getFollowings();
    }, []);

    return (
        <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/tweet/:tweetId' component={TweetPage} />
            <Route exact path='/explore' component={ExplorePage} />
            <Route exact path='/profile/:userId' render={() => <ProfilePage endpoint={'profile'} />} />
            <Route exact path='/profile/:userId/likes' render={() => <ProfilePage endpoint={'likes'} />} />
            <Route exact path='/profile/:userId/following' render={() => <Follow endpoint={'following'} />} />
            <Route exact path='/profile/:userId/follower' render={() => <Follow endpoint={'follower'} />} />
        </Switch>
    );
}

export default withRouter(connect(null, {removeAlert, getLikes, getRetweets, getFollowings})(Main));