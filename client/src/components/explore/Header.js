import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {getUsers} from '../../actions/explore';
import {connect} from 'react-redux';

const Header = ({getUsers}) => {
    const [formData, setFormData] = useState({
        username: ''
    });

    const {username} = formData;

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        
        if(username === '') {
            return;
        }

        getUsers(formData);
    }

    return (
        <div className='main__header border--bottom'>
            <div className='main__header-form p--small'>
                <form className='option__form' autoComplete='off' onSubmit={onSubmit}>
                    <div className='option__form-group'>
                        <input type='text' name='username' className='option__form-input' placeholder='Search Twitter' value={username} onChange={onChange} />
                        <button type='submit' className='option__form-btn'>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default connect(null, {getUsers})(Header);