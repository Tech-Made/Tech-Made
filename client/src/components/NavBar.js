import React from 'react';
import Logo from '../assets/logos/logo-sm-blue.png';
import '../styles/navbar.scss';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <header>
            <nav>
                <div className='logo'>
                <Link className='nav-link' to='/'>
                    <img alt='techmade' src={Logo}/>
                </Link>
                </div>
                <div className='links'>
                    {/* <p className='nav-link'>Request Site</p> */}
                    {/* <p className='nav-link'>Porotfolio</p> */}
                    <Link className='nav-link' to='/contact'>Contact 📲</Link>
                </div>
            </nav>
        </header>
    );
};

export default NavBar;