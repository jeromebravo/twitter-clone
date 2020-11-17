import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt, faComment, faRetweet, faHeart} from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import {likeTweet} from '../../actions/likes';
import {connect} from 'react-redux';
import {retweetTweet} from '../../actions/retweets';
import {toggleReplyPopup, toggleActivityPopup} from '../../actions/popup';
import {deleteTweet} from '../../actions/tweet';

const MainTweet = ({tweets: {tweet, loading}, likes, retweets, likeTweet, currentUser, retweetTweet, toggleReplyPopup, deleteTweet, toggleActivityPopup}) => {
    const [liked, setLike] = useState(false);
    const [retweeted, setRetweet] = useState(false);

    const history = useHistory();

    useEffect(() => {
        const likeIndex = likes.findIndex(like => like.tweet._id === tweet._id);
        const retweetIndex = retweets.findIndex(retweet => retweet.tweet === tweet._id);

        if(likeIndex !== -1) {
            setLike(true);
        } else {
            setLike(false);
        }

        if(retweetIndex !== -1) {
            setRetweet(true);
        } else {
            setRetweet(false);
        }
    }, [likes, retweets]);

    const onDelete = () => {
        deleteTweet(tweet._id);
        history.push('/home');
    }

    return !loading && (
        <div className='main__tweet main__tweet--column'>
            <div className='main__tweet-top'>
                <Link className='profile-picture-link' to={`/profile/${tweet.profile.user._id}`}>
                    <img src={tweet.profile.icon} alt='Profile' className='profile-picture--small' />
                </Link>
                    
                <div className='main__tweet-top-header mb--small'>
                    <div className='main__tweet-top-group'>
                        <h3 className='header--small mr--smallest'><Link to={`/profile/${tweet.profile.user._id}`} className='link'>{tweet.profile.name}</Link></h3>
                        <p className='paragraph paragraph--large mr--smallest'><Link to={`/profile/${tweet.profile.user._id}`} className='link'>{tweet.profile.user.username}</Link></p>
                    </div>
                    <div className='main__tweet-top-group'>
                        {tweet.profile.user._id === currentUser.user._id &&
                            <button className='main__tweet-icon main__tweet-icon--red' onClick={onDelete}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                        }
                    </div>
                </div>
            </div>

            <div className='main__tweet-bottom'>
                <div className='main__tweet-bottom-body mb--small'>
                    <p className='paragraph--largest mb--smallest'>{tweet.text}</p>
                    <p className='paragraph paragraph--large mb--small'>
                        <Moment format='LT'>{tweet.date}</Moment>
                        {' '} &middot; {' '}
                        <Moment format='MMM DD'>{tweet.date}</Moment>
                    </p>
                </div>

                <div className={tweet.retweets.length === 0 && tweet.likes.length === 0 ? 'main__tweet-bottom-activities mb--small border--bottom' : 'main__tweet-bottom-activities mb--small border--top border--bottom'}>
                    <p className='paragraph paragraph--large color--black '>
                        <button className='link mr--medium' onClick={() => toggleActivityPopup('retweet')}>
                            <span className='bold-font'>{tweet.retweets.length > 0 ? tweet.retweets.length : '' }</span>
                            {' '}
                            <span className='color--gray'>{tweet.retweets.length === 1 ? 'Retweet' : tweet.retweets.length > 1 ? 'Retweets': '' }</span>
                        </button>
                        <button className='link' onClick={() => toggleActivityPopup('like')}>
                            <span className='bold-font'>{tweet.likes.length > 0 ? tweet.likes.length : '' }</span>
                            {' '}
                            <span className='color--gray'>{tweet.likes.length === 1 ? 'Like' : tweet.likes.length > 1 ? 'Likes' : '' }</span>
                        </button>
                    </p>
                </div>

                <div className='main__tweet-bottom-footer'>
                    <button className='main__tweet-icon main__tweet-icon--primary font--large' onClick={toggleReplyPopup}>
                        <FontAwesomeIcon icon={faComment} className='mr--small' />
                    </button>
                    <button className={retweeted ? 'main__tweet-icon main__tweet-icon--green font--large retweet-btn color--green' : 'main__tweet-icon main__tweet-icon--green font--large retweet-btn'} onClick={() => retweetTweet(tweet._id, retweeted, currentUser)}>
                        <FontAwesomeIcon icon={faRetweet} className='mr--small' />
                    </button>
                    <button className={liked ? 'main__tweet-icon main__tweet-icon--red font--large like-btn color--red' : 'main__tweet-icon main__tweet-icon--red font--large like-btn'} onClick={() => likeTweet(tweet._id, liked)}>
                        <FontAwesomeIcon icon={faHeart} className='mr--small' />
                    </button>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    tweets: state.tweet,
    likes: state.likes.likes,
    retweets: state.retweets.retweets,
    currentUser: state.auth.currentUser
});

export default connect(mapStateToProps, {likeTweet, retweetTweet, toggleReplyPopup, deleteTweet, toggleActivityPopup})(MainTweet);