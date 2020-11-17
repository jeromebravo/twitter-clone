import React, {useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import {getProfile} from '../../actions/profile';
import {useRouteMatch, Redirect} from 'react-router-dom';
import People from '../layout/People';
import Header from './Header';
import Navbar from '../layout/Navbar';
import Searchbar from '../layout/Searchbar';
import TweetPopup from '../popup/TweetPopup';

const Follow = ({auth, profileLoading, profile, follows, getProfile, endpoint}) => {
    const match = useRouteMatch();

    useEffect(() => {
        if(!profileLoading) {
            if(profile.user._id !== match.params.userId) {
                getProfile(match.params.userId);
            }
        } else {
            getProfile(match.params.userId);
        }
    }, []);

    return !auth.loading && (
        auth.isAuthenticated ? (
            !profileLoading && (
                <Fragment>
                    <Navbar />
                    <main className='main'>
                        <Header name={profile.name} username={profile.user.username} userId={match.params.userId} endpoint={endpoint} />
                        <div className='popup__not-scrollable popup--column'>
                            {endpoint === 'following' ? 
                                follows.followings.map(following => <People key={following._id} profile={following.profile} />)
                                : follows.followers.map(follower => <People key={follower._id} profile={follower.profile} />)
                            }
                        </div>
                    </main>
                    <Searchbar />
                    <TweetPopup />
                </Fragment>
            )
        ) : <Redirect to='/' />
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    profileLoading: state.profile.loading,
    profile: state.profile.profile,
    follows: state.profile.follows
});

export default connect(mapStateToProps, {getProfile})(Follow);