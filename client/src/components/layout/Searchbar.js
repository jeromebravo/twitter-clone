import React, {useState} from 'react';
import {Link, useRouteMatch, useHistory} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {getUsers} from '../../actions/explore';
import {connect} from 'react-redux';

const Searchbar = ({getUsers}) => {
    const [formData, setFormData] = useState({
        username: ''
    });

    const {username} = formData;

    const match = useRouteMatch();
    const history = useHistory();

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        
        if(username === '') {
            return;
        }

        getUsers(formData);
        history.push('/explore');
    }

    return (
        <section className='option'>
            {match.path !== '/explore' &&
                <form className='option__form' autoComplete='off' onSubmit={onSubmit}>
                    <div className='option__form-group'>
                        <input type='text' className='option__form-input' name='username' value={username} onChange={onChange} placeholder='Search Twitter' />
                        <button type='submit' className='option__form-btn'>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </form>
            }

            <div className='option__footer'>
                <Link to='#' className='option__footer-link'>Terms of Service</Link>
                <Link to='#' className='option__footer-link'>Privacy Policy</Link>
                <Link to='#' className='option__footer-link'>Cookie Policy</Link>
                <Link to='#' className='option__footer-link'>Ads info</Link>
                <p className='option__footer-text'>&copy; 2020 Twitter, Inc.</p>
            </div>
        </section>
    );
}

export default connect(null, {getUsers})(Searchbar);