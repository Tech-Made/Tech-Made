import React, { useEffect, useState } from 'react';
import '../styles/projects.scss';
import axios from 'axios'; 
import Lottie from 'lottie-react-web'
import loading from '../assets/loading.json';
import { FETCH_STATUSES } from '../data/types';
import Project from './Project';

// Project image imports
import tempimg from '../assets/images/dm-landing-demo.gif';
import creditswag from '../assets/images/creditswag.png';
import pinetree from '../assets/images/pinetree.gif';
import djiggy from '../assets/images/djiggy.gif';
import sadboykj from '../assets/images/sadboykj.png';
import moving from '../assets/images/moving.gif';



const Projects = (props) => {

  const projects = [
    {
      id: 1,
      name: 'Credit Swag - Conquer Credit Management',
      about: 'A budgeting app for teens. Built for iOS, Android and Web.',
      image: creditswag
    },
    {
      id: 2,
      name: 'Pine Tree Pictures',
      about: 'LA and Chicago based production company. Mobile Responsive Website.',
      image: pinetree
    },
    {
      id: 3,
      name: 'Moving Forks',
      about: 'Modern aesthetic for a exclusive private dining club to throw their events.',
      image: moving
    },
    {
      id: 4,
      name: 'DJ Iggy',
      about: 'DJ Iggy, born Ignacio Ceja, is a Chicago based sound selector.',
      image: djiggy
    },
    {
      id: 5,
      name: 'Sad Boy KJ',
      about: 'Oakland based rapper website for music, event booking and concert ticketing',
      image: sadboykj
    },
    {
      id: 6,
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
                    key={project.id}
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
