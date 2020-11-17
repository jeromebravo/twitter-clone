import React, {Fragment, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Header from './Header';
import Searchbar from '../layout/Searchbar';
import {connect} from 'react-redux';
import TweetList from '../newsFeed/TweetList';
import TweetPopup from '../popup/TweetPopup';
import ReplyPopup from '../popup/ReplyPopup';
import {getNewsFeed} from '../../actions/newsFeed';

const Home = ({newsFeed, likes, auth, retweets, followings, getNewsFeed}) => {
    useEffect(() => {
        getNewsFeed();
    }, []);
    
    return !auth.loading && auth.isAuthenticated ? (
            !newsFeed.loading && !likes.loading && !retweets.loading && !followings.loading && (
                <Fragment>
                    <Navbar />
                    <main className='main'>
                        <Header />
                        <TweetList tweets={newsFeed.tweets} />
                    </main>
                    <Searchbar />
                    <TweetPopup />
                    <ReplyPopup />
                </Fragment>
            )
        ) : <Redirect to='/' />
}

const mapStateToProps = state => ({
    newsFeed: state.newsFeed,
    likes: state.likes,
    auth: state.auth,
    retweets: state.retweets,
    followings: state.followings
});

export default connect(mapStateToProps, {getNewsFeed})(Home);