import React from 'react';
import logo from '../assets/logos/logo-blue.png';
import { Link } from 'react-router-dom';
import '../styles/footer.scss'

const Footer = () => {
    return (
        <footer>
            <center>
                <Link to='/'>
                    <img className='footer-logo' src={logo} alt='Techmade'/>
                </Link>
                <p>Copyrights Techmade. 2019.</p>
            </center>
        </footer>

    )
}

export default Footer;
