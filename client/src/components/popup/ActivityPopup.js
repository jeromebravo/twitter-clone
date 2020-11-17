import React from 'react';
import {connect} from 'react-redux';
import People from '../layout/People';
import {toggleActivityPopup} from '../../actions/popup';

const ActivityPopup = ({activityPopup, tweet, toggleActivityPopup}) => (
    <section className={activityPopup.isActive ? 'popup unhide' : 'popup'}>
        <div className='popup__content'>
            <div className='popup__header'>
                <button type='button' className='popup__close mr--small' onClick={() => toggleActivityPopup(activityPopup.type)}>
                    &#215;
                </button>
                <h3 className='header--medium color--black mb--mini'>{activityPopup.type === 'like' ? 'Liked by' : 'Retweeted by'}</h3>
            </div>
    
            <div className='popup__scrollable popup--column'>
                {activityPopup.type === 'like' ? tweet.likes.map(like => <People key={like.profile._id} profile={like.profile}/>) : tweet.retweets.map(retweet => <People key={retweet.profile._id} profile={retweet.profile}/>)}
            </div>
        </div>
    </section>
)

const mapStateToProps = state => ({
    activityPopup: state.popup.activityPopup,
    tweet: state.tweet.tweet
});

export default connect(mapStateToProps, {toggleActivityPopup})(ActivityPopup);