import React, { Component } from 'react';
import '../styles/projects.scss';
import  tempimg from '../assets/images/dm-landing-demo.gif';
import axios from 'axios'; 
// This component will show the projects.
// Eeach project has an image associated, a link to the work, a title, and 2-3 sentence description.

class Projects extends Component {
    state = {
        projects: false
    }
    componentDidMount = async () => {
        const res = await axios.get('http://localhost:5000/projects');
        this.setState({
            projects: res.data
        })
    }

    render() {
        if (this.state.projects === false) {
            return <p>Loading projects... hold tight! ⚡️</p>
        } else {
            return (
                <>
                    <div id='projects-section' className="projects-section">
                        <h1 className='section-title'>Our Products</h1>
                        {/* <p className='section-slogan'>Designed and developed with love at Techmade</p> */}
                        <div className="projects-container">
                            <div className="project">
                                <div className="asset-container bluebg">
                                    <img className='project-asset' src={tempimg} />
                                </div>
                                <div className='project-content'>
                                    <h2 className="project-title">Digital Menu</h2>
                                    <p className="tech-text blue">My partner built the back end Node API that fed to my React & Redux front end. Also created a CSS library to speed development.</p>
                                    <p className='project-description'>Online database menu management for restaurants. Open API any onlinemenu service can make a request for data.</p>
                                </div>
                                <div className="btn-container">
                                    <button onClick={window.open('https://digitalmenuapp.herokuapp.com/','_blank')} className='blue-btn'>Try It</button>
                                    <button onClick={window.open('https://github.com/AwesomeZaidi/Digital-Menu-Frontend/','_blank')} className="blue-btn"><i className='icon fab fa-github'></i></button>
                                </div>
                            </div>  
                        </div>
                    </div>
                </>
            );
        }
    }
}

export default Projects;