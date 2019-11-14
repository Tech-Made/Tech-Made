import React from 'react';
import '../styles/projects.scss';
import { Link } from 'react-router-dom';
import Project from './Project';

// Project image imports
import tempimg from '../assets/images/dm-landing-demo.gif';
import creditswag from '../assets/images/creditswag.png';
import pinetree from '../assets/images/pinetree.gif';
import djiggy from '../assets/images/djiggy.gif';
import sadboykj from '../assets/images/sadboykj.png';
import moving from '../assets/images/moving.gif';
import makeschool from '../assets/images/makeschool.gif';

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
      name: 'Make School',
      about: 'A coding school of the future.',
      image: makeschool
    },
    {
      id: 5,
      name: 'DJ Iggy',
      about: 'DJ Iggy, born Ignacio Ceja, is a Chicago based sound selector.',
      image: djiggy
    },
    {
      id: 6,
      name: 'Sad Boy KJ',
      about: 'Oakland based rapper website for music, event booking and concert ticketing',
      image: sadboykj
    },
    {
      id: 7,
      name: 'Digital Menu',
      about: 'Online database menu management for restaurants. Open API any onlinemenu service can make a request for data.',
      image: tempimg
    }
  ]

  return (
    <>
      <div id='projects-section' className="projects-section">
            <h1 className='section-title'>OUR <span className='blue'>PRODUCTS</span></h1>
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
            <Link to='/contact'>
            <button className='btn light'>
              Let's Talk
            </button>
          </Link>
        </div>
    </>
  );
}


export default Projects;
