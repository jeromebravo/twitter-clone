import React from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {deleteReply} from '../../actions/tweet';

const Reply = ({reply, tweetId, deleteReply, userId}) => {
    return (
        <div className='main__tweet'>
            <div className='main__tweet-left'>
                <Link className='profile-picture-link' to={`/profile/${reply.profile.user._id}`}>
                    <img src={reply.profile.icon} alt='Profile' className='profile-picture--small' />
                </Link>
            </div>

            <div className='main__tweet-right'>
                <div className='main__tweet-right-header'>
                    <h3 className='header--small mr--smallest'><Link to={`/profile/${reply.profile.user._id}`} className='link'>{reply.profile.name}</Link></h3>
                    <p className='paragraph paragraph--large mr--smallest'><Link to={`/profile/${reply.profile.user._id}`} className='link'>{reply.profile.user.username}</Link></p>
                    <p className='paragraph paragraph--large'>&middot; <Moment format='MMM DD'>{reply.date}</Moment></p>
                    {reply.profile.user._id === userId && 
                    <button className='main__tweet-icon main__tweet-icon--red ml-auto' onClick={() => deleteReply(tweetId, reply._id)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                    }
                </div>

                <div className='main__tweet-right-body mb--smallest'>
                    <p className='paragraph--large'>{reply.text}</p>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    tweetId: state.tweet.tweet._id,
    userId: state.auth.currentUser.user._id
})

export default connect(mapStateToProps, {deleteReply})(Reply);