import React, {useState} from 'react';
import {connect} from 'react-redux';
import {toggleEditProfilePopup} from '../../actions/popup';
import {editProfile} from '../../actions/profile';

const EditProfilePopup = ({editProfilePopup, toggleEditProfilePopup, profile, editProfile}) => {
    const [formData, setFormData] = useState({
        icon: profile.icon,
        header: profile.header,
        name: profile.name,
        bio: profile.bio,
        location: profile.location,
        website: profile.website,
        birthday: profile.birthday
    });

    const {icon, header, name, bio, location, website, birthday} = formData;

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
    }

    const onClick = () => {
        if(name === '' || name.length > 15 || bio.length > 30 || location.length > 30 || website.length > 30) {
            return;
        }

        editProfile(formData);
        toggleEditProfilePopup();
    }

    const closePopup = () => {
        setFormData({
            ...formData,
            icon: profile.icon,
            header: profile.header,
            name: profile.name,
            bio: profile.bio,
            location: profile.location,
            website: profile.website,
            birthday: profile.birthday
        });
        toggleEditProfilePopup();
    }

    return (
        <section className={editProfilePopup ? 'popup unhide' : 'popup'}>
            <div className='popup__content'>
                <div className='popup__header'>
                    <button type='button' className='popup__close mr--small' onClick={closePopup}>
                        &#215;
                    </button>
                    <h3 className='header--medium color--black mb--mini'>Edit profile</h3>
                    <button className='btn btn-tweet' onClick={onClick}>Save</button>
                </div>
    
                <div className='popup__scrollable p--small'>
                    <form className='popup__tweet-form' autoComplete='off' onSubmit={onSubmit}>
                        <div className='form__group mb--medium'>
                            <label htmlFor='icon' className='form__label'>Icon (Image URL)</label>
                            <input type='text' name='icon' id='icon' className='form__input' value={icon} onChange={onChange} />
                        </div>

                        <div className='form__group mb--medium'>
                            <label htmlFor='header' className='form__label'>Header (Image URL)</label>
                            <input type='text' name='header' id='header' className='form__input' value={header} onChange={onChange} />
                        </div>

                        <div className='form__group mb--medium'>
                            <label htmlFor='name' className='form__label'>Name</label>
                            <input type='text' name='name' id='name' className='form__input' value={name} onChange={onChange} />
                            <p className='paragraph paragraph--small'>{name.length}/15</p>
                        </div>

                        <div className='form__group mb--medium'>
                            <label htmlFor='bio' className='form__label'>Bio</label>
                            <input type='text' name='bio' id='bio' className='form__input' value={bio} onChange={onChange} />
                            <p className='paragraph paragraph--small'>{bio.length}/30</p>
                        </div>

                        <div className='form__group mb--medium'>
                            <label htmlFor='location' className='form__label'>location</label>
                            <input type='text' name='location' id='location' className='form__input' value={location} onChange={onChange} />
                            <p className='paragraph paragraph--small'>{location.length}/30</p>
                        </div>

                        <div className='form__group mb--medium'>
                            <label htmlFor='website' className='form__label'>Website</label>
                            <input type='text' name='website' id='website' className='form__input' value={website} onChange={onChange} />
                            <p className='paragraph paragraph--small'>{website.length}/30</p>
                        </div>

                        <div className='form__group mb--medium'>
                            <label htmlFor='birthday' className='form__label'>Birthday</label>
                            <input type='date' name='birthday' id='birthday' className='form__input' value={birthday} onChange={onChange} />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = state => ({
    editProfilePopup: state.popup.editProfilePopup,
    profile: state.profile.profile
});

export default connect(mapStateToProps, {toggleEditProfilePopup, editProfile})(EditProfilePopup);