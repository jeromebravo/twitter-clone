import React, {Fragment, useEffect} from 'react';
import Navbar from '../layout/Navbar';
import Searchbar from '../layout/Searchbar';
import Header from './Header';
import MainTweet from './MainTweet';
import {getTweet} from '../../actions/tweet';
import {connect} from 'react-redux';
import ReplyList from './ReplyList';
import TweetPopup from '../popup/TweetPopup';
import ReplyPopup from '../popup/ReplyPopup';
import {Redirect} from 'react-router-dom';
import ActivityPopup from '../popup/ActivityPopup';

const TweetPage = ({match, getTweet, tweet, auth}) => {
    useEffect(() => {
        getTweet(match.params.tweetId);
    }, []);

    return !auth.loading && (
        auth.isAuthenticated ? (
            !tweet.loading && (
                <Fragment>
                    <Navbar />
                    <main className='main'>
                        <Header />
                        <MainTweet />
                        <ReplyList />
                    </main>
                    <Searchbar />
                    <TweetPopup />
                    <ReplyPopup />
                    <ActivityPopup />
                </Fragment>
            )
        ) : <Redirect to='/' />
    );
}

const mapStateToProps = state => ({
    tweet: state.tweet,
    auth: state.auth
});

export default connect(mapStateToProps, {getTweet})(TweetPage);