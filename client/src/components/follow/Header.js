import React, {Fragment} from 'react';
import {useHistory, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

const Header = ({name, username, userId, endpoint}) => {
    const history = useHistory();

    return (
        <Fragment>
            <div className='main__header-text'>
                <div className='main__header-group'>
                    <button className='main__header-btn' onClick={() => history.goBack()}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                </div>
                
                <div className='main__header-group'>
                    <h2 className='header--medium color--black'>{name}</h2>
                    <p className='paragraph paragraph--small'>{username}</p>
                </div>
            </div>

            <div className='main__header border--bottom'>
                <div className='main__header-profile-footer'>
                    <Link to={`/profile/${userId}/follower`} className={endpoint === 'follower' ? 'link link-animation border--bottom-primary' : 'link link-animation'}>Followers</Link>
                    <Link to={`/profile/${userId}/following`} className={endpoint === 'following' ? 'link link-animation border--bottom-primary' : 'link link-animation'}>Followings</Link>
                </div>
            </div>
        </Fragment>
    );
}

export default Header;