import React from 'react'
import LogoSVG from '../../assets/logo.svg' 
import AppConstants from '../../constants/AppConstants'
import './styles.css'

const Header: React.FC = () => {
    return (
        <div className='header'>
            <div className='header--content'>
                <img src={LogoSVG} alt={AppConstants.LOGO_ALT} className='header--content--logo'/>
                <h1 className='header--content--title'>{AppConstants.APP_NAME}</h1>
            </div>
        </div>
    )
}

export default Header