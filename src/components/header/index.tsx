import React from 'react'
import { ReactComponent as LogoSVG } from '../../assets/logo.svg' 
import './styles.css'

const Header: React.FC = () => {
    return (
        <div className='header'>
            <div className='header--content'>
                <LogoSVG className='header--content--logo'/>
                <h1 className='header--content--title'>Custo do Frete</h1>
            </div>
        </div>
    )
}

export default Header