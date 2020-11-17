import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {getProfile} from '../../actions/profile';
import {follow} from '../../actions/followings';

const People = ({profile, currentUserFollowings, currentUser, getProfile, follow}) => {
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

    const onClick = async e => {
        e.stopPropagation();
        await getProfile(profile.user._id);
        follow(followed, currentUser, profile.user._id, profile._id);
    }

    return (
        <div className='popup__activity' onClick={() => history.push(`/profile/${profile.user._id}`)}>
            <img src={profile.icon} alt='Profile' className='popup__picture' />
            <div className='popup__group'>
                <div>
                    <h3 className='header--small'><Link to={`/profile/${profile.user._id}`} className='link' onClick={e => e.stopPropagation()}>{profile.name}</Link></h3>
                    <p className='paragraph paragraph--large'><Link to={`/profile/${profile.user._id}`} className='link' onClick={e => e.stopPropagation()}>{profile.user.username}</Link></p>
                    <p className='paragraph paragraph--large color--black'>{profile.bio}</p>
                </div>
                <div>
                    {profile.user._id !== currentUser.user._id &&
                        <button className={followed ? 'btn btn--outline btn--outline-smallest background-primary' : 'btn btn--outline btn--outline-smallest'} onClick={onClick}>
                            {followed ? 'Followed' : 'Follow'}
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    currentUserFollowings: state.followings.followings,
    currentUser: state.auth.currentUser
});

export default connect(mapStateToProps, {getProfile, follow})(People);