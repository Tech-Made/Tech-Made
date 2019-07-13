import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.scss';
import Lightning from '../assets/logos/logo-sm-white-blue.png';
import Logo from '../assets/logos/logo-white-only.png';

class Home extends Component {
	render() {
		return (
			<div>
				<div className='landing-layout'>
					<img className='lightning lightning-logo' alt='lightning' src={Lightning}></img>
					<img className='tm-logo' alt='techmade' src={Logo}></img>
					<p className='slogan'>We craft stunning digital experiences.</p>
					{/* below is a work in progress */}
					{/* <div className='content'>
						<p className='__container__text'>We craft stunning</p>
						<ul class="content__container__list">
							<li class="content__container__list__item">digital experiences</li>
							<li class="content__container__list__item">mobile apps</li>
							<li class="content__container__list__item">high conversion websites</li>
							<li class="content__container__list__item">products</li>
						</ul>
					</div> */}
					<div>
						<a target='_blank' href='https://www.linkedin.com/company/20344646'><button className='btn dark'>More About Us</button></a>
						<Link to='/contact'><button className='btn light'>Let's Talk</button></Link>
					</div>
					{/* <i href='#about-section' className="fas fa-arrow-circle-down"></i> */}
				</div>

				{/* <div id='about-section' className='about-us-section'>
					<p>hello</p>
					<p>hello</p>
					<p>hello</p>
				</div> */}
			</div>
		);
	}
}


export default Home;
