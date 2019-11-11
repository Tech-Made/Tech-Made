import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/contact.scss';
import Lightning from '../assets/logos/logo-sm-white-blue.png';
import Logo from '../assets/logos/logo-white-only.png';
import axios from 'axios';
import { FETCH_STATUSES } from '../data/types';
import Lottie from 'lottie-react-web'
import loading from '../assets/loading.json';

const Contact = () => {

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [message, setMessage] = useState('');
	const [errMsg, setErrMsg] = useState(false);
	const [successMsg, setSuccessMsg] = useState(false);
	const [postStatus, setPostStatus] = useState(FETCH_STATUSES.OK);

	const handleSubmit = async () => {
		if (name === '' || email === '' || message === '') {		
			setErrMsg('Please fill out all required fields.')
		} else {
			setPostStatus(FETCH_STATUSES.LOADING);
			setErrMsg('');
			try {
				const _ = axios.post('localhost:3000/contact');
				setPostStatus(FETCH_STATUSES.OK)
				setErrMsg(false)
				setSuccessMsg('Thanks, someone will be in touch shortly.')			
			} catch(e) {
				setPostStatus(FETCH_STATUSES.ERROR);
				setErrMsg('Uh Oh Something went wrong.')
				setSuccessMsg(false);		
			}
		}
	}

	return (
		<div>
			<div className='landing-layout'>
				<img className='lightning lightning-logo' alt='lightning' src={Lightning}></img>
				<img className='tm-logo' alt='techmade' src={Logo}></img>
				<p className='slogan'>Let's Talk.</p>

				<div className='form'>
					<div className='top-fields'>
						<input
							type='name'
							value={name}
							placeholder='*Your name'
							onChange={(e) => setName(e.target.value)}
						/>
						<input
							type='email'
							value={email}
							placeholder='*email@website.com'
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							value={phone}
							placeholder='Number (Optional)'
							onChange={(e) => setPhone(e.target.value)}
						/>
					</div>
					<textarea
						className='message-box'
						type='text'
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder='*Your message... tell us what you are interested in and any questions you have.
					The more detail the better. Feel free to include any links, budget numbers and timeline if you wish.'
					/>
					{
						postStatus === FETCH_STATUSES.LOADING &&
						<Lottie options={{
                            animationData: loading,
                            loop: true,
                            autoplay: true,
                        }}/>
					}
					{
						successMsg &&
						<p>{successMsg}</p>
					}
					{
						errMsg &&
						<p>{errMsg}</p>
					}
					<button
						className='btn light'
						onClick={handleSubmit}
					>
						Submit
					</button>
					{/* <p className='err-msg'><Link to='/'>View our portfolio</Link> | Questions? team@techmade.co</p> */}
				</div>
			</div>
		</div>
	);
}


export default Contact;
