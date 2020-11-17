import React, {Fragment, useEffect} from 'react';
import Navbar from '../layout/Navbar';
import Searchbar from '../layout/Searchbar';
import {connect} from 'react-redux';
import {getProfile} from '../../actions/profile';
import {useRouteMatch} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Header from './Header';
import TweetList from '../newsFeed/TweetList';
import TweetPopup from '../popup/TweetPopup';
import ReplyPopup from '../popup/ReplyPopup';
import EditProfilePopup from '../popup/EditProfilePopup';

const ProfilePage = ({getProfile, auth, profile, newsFeed, endpoint, followings, likes}) => {
    const match = useRouteMatch();

    useEffect(() => {
        getProfile(match.params.userId);
    }, [match.params.userId]);

    return !auth.loading && (
        auth.isAuthenticated ? (
            !profile.loading && !newsFeed.loading && !followings.loading && (
                <Fragment>
                    <Navbar />
                    <main className='main'>
                        <Header endpoint={endpoint} />
                        <TweetList tweets={endpoint === 'profile' ? newsFeed.tweets : profile.profile.user._id === auth.currentUser.user._id ? likes : profile.likes } />
                    </main>
                    <Searchbar />
                    <TweetPopup />
                    <ReplyPopup />
                    <EditProfilePopup />
                </Fragment>
            )
        ) : <Redirect to='/' />
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    newsFeed: state.newsFeed,
    followings: state.followings,
    likes: state.likes.likes
});

export default connect(mapStateToProps, {getProfile})(ProfilePage);