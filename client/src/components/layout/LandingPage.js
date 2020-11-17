import React, {Fragment} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faUserFriends, faComment} from '@fortawesome/free-solid-svg-icons';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';
import {connect} from 'react-redux';

const LandingPage = ({isAuthenticated}) => {
    if(isAuthenticated) {
        return <Redirect to='/home' />
    }

    return (
    <Fragment>
        <section className='landing'>
            <div className='landing__description'>
                <img className='landing__background' src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png' alt='Background' />
                <div className='landing__description-box'>
                    <h2 className='header--medium mb--medium'>
                        <span className='landing__icon'>
                            <FontAwesomeIcon icon={faSearch} />
                        </span>
                        <span className='landing__text'>
                            Follow your interests.
                        </span>
                    </h2>
                    <h2 className='header--medium mb--medium'>
                        <span className='landing__icon'>
                            <FontAwesomeIcon icon={faUserFriends} />
                        </span>
                        <span className='landing__text'>
                            Hear what people are talking about.
                        </span>
                    </h2>
                    <h2 className='header--medium mb--medium'>
                        <span className='landing__icon'>
                            <FontAwesomeIcon icon={faComment} />
                        </span>
                        <span className='landing__text'>
                            Join the conversation.
                        </span>
                    </h2>
                </div>
            </div>

            <div className='landing__option'>
                <div className='landing__option-box'>
                    <div className='logo logo--large'>
                        <FontAwesomeIcon icon={faTwitter} />
                    </div>
                    <h1 className='header--largest mb--large'>
                        See what's happening in the world right now
                    </h1>
                    <h3 className='header--small mb--small'>
                        Join Twitter today.
                    </h3>
                    <Link className='btn btn--solid mb--small py--small' to='/signup'>Sign up</Link>
                    <Link className='btn btn--outline py--small' to='/login'>Log in</Link>
                </div>
            </div>
        </section>

        <footer className='footer'>
            <Link className='footer__link' to='#'>About</Link>
            <Link className='footer__link' to='#'>Help Center</Link>
            <Link className='footer__link' to='#'>Terms of Service</Link>
            <Link className='footer__link' to='#'>Privacy Policy</Link>
            <Link className='footer__link' to='#'>Cookie Policy</Link>
            <Link className='footer__link' to='#'>Ads info</Link>
            <Link className='footer__link' to='#'>Blog</Link>
            <Link className='footer__link' to='#'>Status</Link>
            <Link className='footer__link' to='#'>Careers</Link>
            <Link className='footer__link' to='#'>Brand Resources</Link>
            <Link className='footer__link' to='#'>Advertising</Link>
            <Link className='footer__link' to='#'>Marketing</Link>
            <Link className='footer__link' to='#'>Twitter for Business</Link>
            <Link className='footer__link' to='#'>Developers</Link>
            <Link className='footer__link' to='#'>Directory</Link>
            <Link className='footer__link' to='#'>Settings</Link>
            <p className='footer__text'>&copy; Twitter, Inc.</p>
        </footer>
    </Fragment>
)};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(LandingPage);