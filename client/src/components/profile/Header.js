import React, {useState, useEffect} from 'react';
import {useHistory, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faCalendarAlt, faMapMarkerAlt, faLink} from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import {toggleEditProfilePopup} from '../../actions/popup';
import {follow} from '../../actions/followings';

const Header = ({profile, followings, followers, tweets, userId, toggleEditProfilePopup, endpoint, currentUserFollowings, follow, currentUser}) => {
    const history = useHistory();

    const [followed, setFollow] = useState(false);

    useEffect(() => {
        const index = currentUserFollowings.findIndex(follow => follow.profile === profile._id);

        if(index !== -1) {
            setFollow(true);
        } else {
            setFollow(false);
        }
    }, [profile._id, currentUserFollowings]);

    return (
        <div className='main__header'>
            <div className='main__header-text'>
                <div className='main__header-group'>
                    <button className='main__header-btn' onClick={() => history.goBack()}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                </div>
                <div className='main__header-group'>
                    <h2 className='header--medium color--black'>{profile.name}</h2>
                    <p className='paragraph paragraph--small'>
                        {tweets.length}
                        {' '}
                        {tweets.length > 1 ? 'Tweets' : 'Tweet'}
                    </p>
                </div>
            </div>

            <div className='main__header-profile'>
                <div className='main__header-profile-header'>
                    <img src={profile.header} alt='Header' className='main__header-profile-header-img' />
                </div>
                    
                <div className='main__header-profile-body'>
                    <img src={profile.icon} alt='Profile' className='profile-picture--large' />
                    {userId === profile.user._id ? (
                        <button className='btn btn--outline btn--outline-smallest' onClick={toggleEditProfilePopup}>Edit profile</button>
                    ) : (
                            <button className={followed ? 'btn btn--outline btn--outline-smallest background-primary' : 'btn btn--outline btn--outline-smallest'} onClick={() => follow(followed, currentUser, profile.user._id, profile._id)}>
                                {followed ? 'Followed' : 'Follow'}
                            </button>
                        )}
                        
                    <div className='main__header-profile-info'>
                        <h2 className='header--medium color--black'>{profile.name}</h2>
                        <p className='paragraph paragraph--large mb--smallest'>{profile.user.username}</p>
                        {profile.bio &&
                            <p className='paragraph paragraph--large color--black mb--smallest'>{profile.bio}</p>
                        }
                        <p className='paragraph paragraph--large mb--smallest'>
                            <FontAwesomeIcon icon={faCalendarAlt} className='mr--smallest' />
                            Joined {' '} <Moment format='MMMM YYYY'>{profile.user.date}</Moment>
                        </p>
                        {profile.location &&
                            <p className='paragraph paragraph--large mb--smallest'>
                                <FontAwesomeIcon icon={faMapMarkerAlt} className='mr--smallest' />
                                {profile.location}
                            </p>
                        }
                        {profile.website &&
                            <p className='paragraph paragraph--large mb--smallest'>
                                <FontAwesomeIcon icon={faLink} className='mr--smallest' />
                                <span className='link color--primary'>{profile.website}</span>
                            </p>
                        }
                        <p className='paragraph paragraph--large color--black '>
                            <Link to={`/profile/${profile.user._id}/following`} className='link mr--medium'>
                                <span className='bold-font'>{followings.length}</span> {' '}
                                <span className='color--gray'>{followings.length > 1 ? 'Followings' : 'Following'}</span>
                            </Link>
                            <Link to={`/profile/${profile.user._id}/follower`} className='link'>
                                <span className='bold-font'>{followers.length}</span> {' '}
                                <span className='color--gray'>{followers.length > 1 ? 'Followers' : 'Follower'}</span>
                            </Link>
                        </p>
                    </div>
                </div>

                <div className='main__header-profile-footer'>
                    <Link to={`/profile/${profile.user._id}`} className={endpoint === 'profile' ? 'link link-animation border--bottom-primary' : 'link link-animation'}>Tweets</Link>
                    <Link to={`/profile/${profile.user._id}/likes`} className={endpoint === 'likes' ? 'link link-animation border--bottom-primary' : 'link link-animation'}>Likes</Link>
                </div>
            </div>
        </div>       
    );
}

const mapStateToProps = state => ({
    profile: state.profile.profile,
    followings: state.profile.follows.followings,
    followers: state.profile.follows.followers,
    tweets: state.newsFeed.tweets,
    userId: state.auth.currentUser.user._id,
    currentUserFollowings: state.followings.followings,
    currentUser: state.auth.currentUser
});

export default connect(mapStateToProps, {toggleEditProfilePopup, follow})(Header);