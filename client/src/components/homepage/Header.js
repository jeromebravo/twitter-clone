import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGlobeAmericas} from '@fortawesome/free-solid-svg-icons';
import {newTweet} from '../../actions/tweet';

const Header = ({auth: {currentUser, loading}, newTweet}) => {
    const [formData, setFormData] = useState({
        text: ''
    });

    const {text} = formData;

    const onChange = e =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();

        if(text === '') {
            return;
        }

        newTweet(formData);
        setFormData({...formData, text: ''});
    }

    return !loading && (
        <div className='main__header'>
            <div className='main__header-text'>
                <h2 className='header--medium color--black'>Home</h2>
            </div>

            <div className='main__header-tweet'>
                <Link to={`/profile/${currentUser.user._id}`}>
                    <img src={currentUser.icon} alt='Profile' className='profile-picture--small' />
                </Link>

                <form className='main__header-form' autoComplete='off' onSubmit={onSubmit}>
                    <input type='text' className='main__header-input' name='text' value={text} onChange={onChange} placeholder="What's happening?" />
                    <p className='main__header-input-text'>
                        <FontAwesomeIcon icon={faGlobeAmericas} /> {' '}
                        Everyone can reply
                    </p>
                    <button type='submit' className='btn btn-tweet'>Tweet</button>
                </form>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {newTweet})(Header);