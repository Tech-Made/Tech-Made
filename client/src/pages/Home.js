import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.scss';
import Lightning from '../assets/logos/logo-sm-white-blue.png';
import Logo from '../assets/logos/logo-white-only.png';
import Projects from  '../components/Projects';

class Home extends Component {
	render() {
		return (
			<>
				<div className='landing-layout'>
					<div className='lightning-parent'>
						<img className='lightning lightning-logo' alt='lightning' src={Lightning}></img>
					</div>
					<img className='tm-logo' alt='techmade' src={Logo}></img>
					<p className='slogan'>We craft stunning digital experiences. 💻⚡️</p>
					{/* below is a work in progress */}
					{/* <div className='content'>
						<p className='__container__text'>We craft stunning</p>
						<ul className="content__container__list">
							<li className="content__container__list__item">digital experiences</li>
							<li className="content__container__list__item">mobile apps</li>
							<li className="content__container__list__item">high conversion websites</li>
							<li className="content__container__list__item">products</li>
						</ul>
					</div> */}
					<div>
						<a href='#projects-section'><button className='btn dark scroll'>More About Us</button></a>
						<Link to='/contact'><button className='btn light'>Let's Talk</button></Link>
					</div>
					{/* <i href='#about-section' className="fas fa-arrow-circle-down"></i> */}
				</div>

				<Projects />

			</>
		);
	}
}

export default Home;
