import React, {Fragment} from 'react';
import Header from './Header';
import Navbar from '../layout/Navbar';
import Searchbar from '../layout/Searchbar';
import {connect} from 'react-redux';
import People from '../layout/People';
import TweetPopup from '../popup/TweetPopup';
import {Redirect} from 'react-router-dom';

const ExplorePage = ({explore, auth}) => !auth.loading && (
    auth.isAuthenticated ? (
        <Fragment>
            <Navbar />
            <main className='main'>
                <Header />
                <div className='popup__not-scrollable popup--column'>
                    {!explore.loading && explore.users.map(user => <People key={user._id} profile={user.profile} />)}
                </div>
            </main>
            <Searchbar />
            <TweetPopup />
        </Fragment>
    ) : <Redirect to='/' />
);

const mapStateToProps = state => ({
    explore: state.explore,
    auth: state.auth
});

export default connect(mapStateToProps)(ExplorePage);