import React from "react"
import {Link} from 'react-router-dom'
import Rating from '@mui/material/Rating';
import ReactHlsPlayer from 'react-hls-player'

export default function CourseTile({ course, videoRef, currentPage }) {

    const handleOnMouseOver = (e) => {
        videoRef.current && videoRef.current.play();
    }

    const handleOnMouseOut = (e) => {
        if (videoRef.current) {
            videoRef.current.pause()
            videoRef.current.currentTime = 0
        }
    }

    const imageLink = course.previewImageLink + '/cover.webp'

    const skills = course.meta.skills && course.meta.skills.map((skill) =>
        <div className="flex" key={skill}>
            <span style={{ alignSelf: 'center' }} className="material-icons"> done </span>
            <li style={{ listStyle: 'none' }} >{skill}</li>
        </div>
    );

    return (
        <div key={course.id} className="course-tile" id='tile'
            onMouseOver={(e) => handleOnMouseOver(e)}
            onMouseOut={(e) => handleOnMouseOut(e)}
        >
            <Link to={'/courses/course/' + course.id} state={{ page: currentPage }} > 
                <div id="wrapper" >
                    <img src={imageLink} alt='' className={course.meta.courseVideoPreview ? '' : 'not-hide'} />
                    {course.meta.courseVideoPreview && <ReactHlsPlayer
                        src={course.meta.courseVideoPreview?.link}
                        autoPlay={false}
                        loop
                        controls={true}
                        muted
                        width='400px'
                        height="auto"
                        playerRef={videoRef}
                    />}
                </div>
                <div className="course-info">
                    <h3>{course.title}</h3>
                    <div className="flex">
                        <span className="rating">{course.rating}</span>
                        <Rating defaultValue={course.rating} precision={0.1} readOnly />
                        <span className="lessonsCount">{course.lessonsCount} lessons</span>
                    </div>

                    {skills && <div className="flex">
                        <p>Skills</p>
                        <ul>
                            {skills}
                        </ul>
                    </div>
                    }
                </div>
            </Link>
        </div>
    )
}