import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../styles/contact.scss';
import Lightning from '../assets/logos/logo-sm-white-blue.png';
import Logo from '../assets/logos/logo-white-only.png';

class Home extends Component {
	render() {
		return (
			<div>
				<div className='landing-layout'>
					<img className='lightning lightning-logo' alt='lightning' src={Lightning}></img>
					<img className='tm-logo' alt='techmade' src={Logo}></img>
					<p className='slogan'>Let's Talk.</p>

                    <div className='form'>
                        <div className='top-fields'>
                            <input type='name' placeholder='Your name'></input>
                            <input type='email' placeholder='email@gmail.com'></input>
                            <input placeholder='Number (Optional)'></input>
                        </div>
                        <textarea className='message-box' type='text' placeholder='Your message... tell us what you are interested in and any questions you have.
                        The more detail the better. Feel free to include any links, budget numbers and timeline if you wish.'></textarea>
                        <button className='btn light'>Submit</button>
                    </div>
				</div>
			</div>
		);
	}
}


export default Home;
