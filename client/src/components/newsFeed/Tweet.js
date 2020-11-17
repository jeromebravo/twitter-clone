import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Moment from 'react-moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt, faComment, faRetweet, faHeart} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {getTweet, deleteTweet} from '../../actions/tweet';
import {likeTweet} from '../../actions/likes';
import {retweetTweet} from '../../actions/retweets';
import {toggleReplyPopup} from '../../actions/popup';

const Tweet = ({tweet, type, retweetedBy, getTweet, toggleReplyPopup, likeTweet, deleteTweet, retweets, retweetTweet, auth: {currentUser}, likes}) => {
    const history = useHistory();

    const [liked, setLike] = useState(false);
    const [retweeted, setRetweet] = useState(false);

    useEffect(() => {
        const likeIndex = likes.likes.findIndex(like => like.tweet._id === tweet._id);

        if(likeIndex !== -1) {
            setLike(true);
        } else {
            setLike(false);
        }

        const retweetIndex = retweets.retweets.findIndex(retweet => retweet.tweet === tweet._id);

        if(retweetIndex !== -1) {
            setRetweet(true);
        } else {
            setRetweet(false);
        }

    }, [likes.likes, retweets.retweets]);

    const stopPropagation = e => {
        e.stopPropagation();
    }

    const reply = e => {
        e.stopPropagation();
        getTweet(tweet._id);
        toggleReplyPopup()
    }

    const like = async e => {
        e.stopPropagation();
        getTweet(tweet._id);
        likeTweet(tweet._id, liked);
    }

    const retweet = e => {
        e.stopPropagation();
        getTweet(tweet._id);
        retweetTweet(tweet._id, retweeted, currentUser);
    }

    const onDelete = e => {
        e.stopPropagation();
        deleteTweet(tweet._id);
    }

    return (
        <div className='main__tweet main__tweet-hoverable' onClick={() => history.push(`/tweet/${tweet._id}`)}>
            <div className='main__tweet-left'>
                {type === 'retweet' && (
                    <p className='paragraph paragraph--small text-right mr--small'>
                        <FontAwesomeIcon icon={faRetweet} />
                    </p>
                )}
                <Link className='profile-picture-link ' to={`/profile/${tweet.profile.user._id}`} onClick={stopPropagation}>
                    <img src={tweet.profile.icon} alt='Profile' className='profile-picture--small' />
                </Link>
            </div>

            <div className='main__tweet-right'>
                {type === 'retweet' && (
                    <p className='paragraph paragraph--small'>
                        <Link to={`/profile/${retweetedBy.user}`} className='link' onClick={stopPropagation}>
                            {currentUser.user._id === retweetedBy.user ? 'You retweeted' : retweetedBy.name}
                        </Link>
                    </p>
                )}

                <div className='main__tweet-right-header'>
                    <h3 className='header--small mr--smallest'><Link to={`/profile/${tweet.profile.user._id}`} className='link' onClick={stopPropagation}>{tweet.profile.name}</Link></h3>
                    <p className='paragraph paragraph--large mr--smallest'><Link to={`/profile/${tweet.profile.user._id}`} className='link' onClick={stopPropagation}>{tweet.profile.user.username}</Link></p>
                    <p className='paragraph paragraph--large'>&middot; <Moment format='MMM DD'>{tweet.date}</Moment></p>
                    {currentUser.user._id === tweet.profile.user._id && (
                        <button className='main__tweet-icon main__tweet-icon--red delete-btn ml-auto' onClick={onDelete}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                    )}
                </div>

                <div className='main__tweet-right-body mb--smallest'>
                    <p className='paragraph--large'>{tweet.text}</p>
                </div>

                <div className='main__tweet-right-footer'>
                    <p>
                        <button className='main__tweet-icon main__tweet-icon--primary' onClick={reply}>
                            <FontAwesomeIcon icon={faComment} className='mr--small' />
                            <span>{tweet.replies.length > 0 ? tweet.replies.length : ''}</span>
                        </button>
                    </p>
                    
                    <p>
                        <button className={retweeted ? 'main__tweet-icon main__tweet-icon--green color--green' : 'main__tweet-icon main__tweet-icon--green'} onClick={retweet}>
                            <FontAwesomeIcon icon={faRetweet} className='mr--small' />
                            <span>{tweet.retweets.length > 0 ? tweet.retweets.length : ''}</span>
                        </button>
                    </p>
                    
                    <p>
                        <button className={liked ? 'main__tweet-icon main__tweet-icon--red color--red' : 'main__tweet-icon main__tweet-icon--red'} onClick={like}>
                            <FontAwesomeIcon icon={faHeart} className='mr--small' />
                            <span>{tweet.likes.length > 0 ? tweet.likes.length : ''} </span>
                        </button>
                    </p>    
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    auth: state.auth,
    likes: state.likes,
    retweets: state.retweets
});

export default connect(mapStateToProps, {getTweet, toggleReplyPopup, likeTweet, deleteTweet, retweetTweet})(Tweet);