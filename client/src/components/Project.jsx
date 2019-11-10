import React from 'react'

const Project = (props) => {
    const {
        id,
        name,
        about,
        image
    } = props;

    return (
        <div className="project" key={id}>
            <div className="asset-container bluebg">
                <img className='project-asset' src={image} />
            </div>
            <div className='project-content'>
                <h2 className="project-title">{name}</h2>
                {/* <p className="tech-text blue">My partner built the back end Node API that fed to my React & Redux front end. Also created a CSS library to speed development.</p> */}
                <p className='project-description'>{about}</p>
            </div>
            {/* <div className="btn-container"> */}
                {/* <button onClick={() => window.open('https://digitalmenuapp.herokuapp.com/','_blank')} className='blue-btn'>Try It</button> */}
                {/* <button onClick={() => window.open('https://github.com/AwesomeZaidi/Digital-Menu-Frontend/','_blank')} className="blue-btn"><i className='icon fab fa-github'></i></button> */}
            {/* </div> */}
        </div>
    )
}

export default Project;
