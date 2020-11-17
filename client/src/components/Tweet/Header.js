import React from 'react';
import {useHistory} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

const Header = () => { 
    const history = useHistory();

    return (
        <div className='main__header border--bottom'>
            <div className='main__header-text'>
                <div className='main__header-group'>
                    <button className='main__header-btn' onClick={history.goBack}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                </div>
                <div className='main__header-group'>
                    <h2 className='header--medium color--black'>Tweet</h2>
                </div>
            </div>
        </div>
    );
}

export default Header;