import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGlobeAmericas} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {toggleReplyPopup} from '../../actions/popup';
import {replyTweet} from '../../actions/tweet';
import {getNewsFeed} from '../../actions/newsFeed';
import {getLikes} from '../../actions/likes';

const PopupTweet = ({icon, toggleReplyPopup, replyPopup, replyTweet, tweetId, getNewsFeed, getLikes}) => {
    const [formData, setFormData] = useState({
        text: ''
    });

    const {text} = formData;

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();

        if(text === '') {
            return;
        }

        replyTweet(tweetId, formData);
        toggleReplyPopup();
        getNewsFeed();
        getLikes();
        setFormData({...formData, text: ''});
    }

    const closePopup = () => {
        setFormData({...formData, text: ''});
        toggleReplyPopup();
    }

    return (
        <section className={replyPopup === true ? 'popup unhide' : 'popup'}>
            <div className='popup__content'>
                <div className='popup__header'>
                    <button type='button' className='popup__close' onClick={closePopup}>
                        &#215;
                    </button>
                </div>
    
                <div className='popup__tweet'>
                    <img src={icon} alt='Profile' className='popup__picture' />
                    <form className='popup__tweet-form' autoComplete='off' onSubmit={onSubmit}>
                        <textarea type='text' className='popup__tweet-input' name='text' placeholder="Tweet your reply" onChange={onChange} value={text}></textarea>
                        <p className='popup__tweet-input-text'>
                            <FontAwesomeIcon icon={faGlobeAmericas} /> {' '}
                            Everyone can reply
                        </p>
                        <button type='submit' className='btn btn-tweet'>Tweet</button>
                    </form>
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = state => ({
    icon: state.auth.currentUser.icon,
    replyPopup: state.popup.replyPopup,
    tweetId: state.tweet.tweet._id
});

export default connect(mapStateToProps, {toggleReplyPopup, replyTweet, getNewsFeed, getLikes})(PopupTweet);