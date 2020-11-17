import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome, faHashtag, faSearch, faUser, faSignOutAlt, faFeatherAlt} from '@fortawesome/free-solid-svg-icons';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';
import {connect} from 'react-redux';
import {logout} from '../../actions/auth';
import {toggleTweetPopup} from '../../actions/popup';

const Navbar = ({logout, toggleTweetPopup, auth: {loading, isAuthenticated, currentUser: {user}}}) => { 
    const history = useHistory();

    return !loading && isAuthenticated && (
        <nav className='nav'>
            <ul className='side-nav'>
                <div className='logo logo--small px--medium'>
                    <FontAwesomeIcon icon={faTwitter} />
                </div>

                <li className='side-nav__item' onClick={() => history.push('/home')}>
                    <span className='side-nav__icon'>
                        <FontAwesomeIcon icon={faHome} />
                    </span>
                    <Link to='/home' className='side-nav__link' onClick={e => e.stopPropagation()}>Home</Link>
                </li>

                <li className='side-nav__item' onClick={() => history.push('/explore')}>
                    <span className='side-nav__icon side-nav__icon--hide'>
                        <FontAwesomeIcon icon={faHashtag} />
                    </span>
                    <span className='side-nav__icon side-nav__icon--alt'>
                        <FontAwesomeIcon icon={faSearch} />
                    </span>
                    <Link to='/explore' className='side-nav__link' onClick={e => e.stopPropagation()}>Explore</Link>
                </li>

                <li className='side-nav__item' onClick={() => history.push(`/profile/${user._id}`)}>
                    <span className='side-nav__icon'>
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                    <Link to={`/profile/${user._id}`} className='side-nav__link' onClick={e => e.stopPropagation()}>Profile</Link>
                </li>

                <button className='side-nav__item' onClick={logout}>
                    <span className='side-nav__icon'>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </span>
                    <span className='side-nav__link'>Log out</span>
                </button>

                <button className='btn btn--solid py--large btn--circle' onClick={toggleTweetPopup}>
                    <span className='btn__icon'>
                        <FontAwesomeIcon icon={faFeatherAlt} />
                    </span>
                    <span className='btn__text'>
                        Tweet
                    </span>
                </button>
            </ul>
        </nav>
    );
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logout, toggleTweetPopup})(Navbar);