import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';
import {connect} from 'react-redux';
import {login} from '../../actions/auth';
import Alert from '../layout/Alert';

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const {username, password} = formData;

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        login(formData);
        <Redirect to='/home' />
    }

    if(isAuthenticated) {
        return <Redirect to='/home' />
    }

    return (
    <form className='form' autoComplete='off' onSubmit={onSubmit}>
        <div className='logo logo--large mb--small'>
            <FontAwesomeIcon icon={faTwitter} />
        </div>

        <div className='form__header mb--small text-center'>
            <h2 className='header--large'>Log in to Twitter</h2>
        </div>

        <Alert />

        <div className='form__group mb--small'>
            <label htmlFor='username' className='form__label'>Email or username</label>
            <input type='text' className='form__input' id='username' name='username' value={username} onChange={onChange} required />
        </div>

        <div className='form__group mb--small'>
            <label htmlFor='password' className='form__label'>Password</label>
            <input type='password' className='form__input' id='password' name='password' value={password} onChange={onChange} required />
        </div>

        <div className='form__submit text-center'>
            <button type='submit' className='btn btn--solid mb--medium py--medium'>Log in</button>
            <Link className='form__link' to='/signup'>Sign up for Twitter</Link>
        </div>
    </form>
)};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);