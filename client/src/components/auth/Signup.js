import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';
import {connect} from 'react-redux';
import {register} from '../../actions/auth';
import Alert from '../layout/Alert';

const Signup = ({register, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        birthday: ''
    });

    const {name, email, username, password, birthday} = formData;

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        register(formData);
        <Redirect to='/home' />
    }

    if(isAuthenticated) {
        return <Redirect to='/home' />
    }

    return (
    <form className='form' autoComplete='off' onSubmit={onSubmit}>
        <div className='logo logo--small mb--small'>
            <FontAwesomeIcon icon={faTwitter} />
        </div>

        <div className='form__header mb--small text-center'>
            <h2 className='header--large'>Create your account</h2>
        </div>

        <Alert />

        <div className='form__group mb--medium'>
            <label htmlFor='name' className='form__label'>Name</label>
            <input type='text' className='form__input' id='name' name='name' value={name} onChange={onChange} required />
        </div>

        <div className='form__group mb--medium'>
            <label htmlFor='email' className='form__label'>Email</label>
            <input type='email' className='form__input' id='email' name='email' value={email} onChange={onChange} required />
        </div>

        <div className='form__group mb--medium'>
            <label htmlFor='username' className='form__label'>Username</label>
            <input type='text' className='form__input' id='username' name='username' value={username} onChange={onChange} required />
        </div>

        <div className='form__group mb--medium'>
            <label htmlFor='password' className='form__label'>Password</label>
            <input type='password' className='form__input' id='password' name='password' value={password} onChange={onChange} required />
        </div>

        <div className='form__birthdate mb--large'>
            <h3 className='header--small'>Date of birth</h3>
            <p className='form__text form__text--gray mb--small'>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
            <div className='form__group'>
                <label htmlFor='birthday' className='form__label'>Birthday</label>
                <input type='date' className='form__input' id='birthday' name='birthday' value={birthday} onChange={onChange} required />
            </div>
        </div>

        <div className='form__submit mb--small'>
            <p className='form__text form__text--black mb--small'>
                By signing up, you agree to the <Link className='form__link' to='#'>Terms of Service</Link> and {' '} 
                <Link className='form__link' to='#'>Privacy Policy</Link>, including <Link className='form__link' to='#'>Cookie Use</Link>. 
                Others will be able to find you by email or phone number when provided. <Link className='form__link' to='#'>Privacy Options</Link>
            </p>

            <button type='submit' className='btn btn--solid py--medium'>Sign up</button>
        </div>
    </form>
)};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {register})(Signup);