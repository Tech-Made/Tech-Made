import React, { useEffect, useState } from 'react';
import '../styles/projects.scss';
import axios from 'axios'; 
import Lottie from 'lottie-react-web'
import loading from '../assets/loading.json';
import { FETCH_STATUSES } from '../data/types';
import Project from './Project';

// Project image imports
import tempimg from '../assets/images/dm-landing-demo.gif';


const Projects = (props) => {

  const projects = [
    {
      id: 1,
      name: 'Digital Menu',
      about: 'Online database menu management for restaurants. Open API any onlinemenu service can make a request for data.',
      image: tempimg
    }
  ]

  return (
    <>
      <div id='projects-section' className="projects-section">
            <h1 className='section-title'>Our Products</h1>
            {/* <p className='section-slogan'>Designed and developed with love at Techmade</p> */}
            <div className="projects-container">
              {
                projects.map((project) => (
                  <Project
                    id={project.id}
                    name={project.name}
                    about={project.about}
                    image={project.image}
                  />
                ))
              }
              <Project/>
            </div>
        </div>
    </>
  );
}


export default Projects;
