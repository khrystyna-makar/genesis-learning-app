import React, { useEffect, useRef } from "react";
import {getCourses} from '../api'
import {Link, useNavigate, useLocation, useLoaderData, defer, Await} from 'react-router-dom'
import Pagination from '@mui/material/Pagination';
import Rating from '@mui/material/Rating';
import ReactHlsPlayer from 'react-hls-player'

export function loader() {
    return defer({courses: getCourses()})
}

export default function Courses() {

    const navigate = useNavigate()
    const location = useLocation()
    const videoRefs= useRef([])
   
    let pageInPath = +location.pathname.slice(location.pathname.lastIndexOf('/') + 1, location.pathname.length);
    if(pageInPath === 0) {
        pageInPath = 1
    }

    const data = useLoaderData()
    
    const [currentPage, setCurrentPage] = React.useState(pageInPath)

    videoRefs.current = Array(10).fill().map((_, i) => videoRefs.current[i] || React.createRef());

    const handleChange = (event, value) => {
        setCurrentPage(value);
        navigate(`/courses/${value}`)
      };

    const coursesCountPerPage = 10;

    function renderCourses(courses) {

        const pagesCount = Math.ceil(courses?.length / coursesCountPerPage);

        const index = (currentPage - 1)*coursesCountPerPage;
      
        const coursesPage = courses?.sort(c => c.launchDate
            ).slice(index, index + coursesCountPerPage)

        const courseElements = coursesPage.map((course, i) => {
                const imageLink = course.previewImageLink + '/cover.webp'
                const skills = course.meta.skills && course.meta.skills.map((skill) =>
                    <div className="flex" key={skill}>
                        <span style={{alignSelf:'center'}} className="material-icons"> done  </span>
                        <li style={{listStyle: 'none'}} >{skill}</li>
                    </div>
                    );
                return (
                    <div key={course.id} className="course-tile" id='tile' 
                        onMouseOver={(e) => handleOnMouseOver(e, i)}
                        onMouseOut={(e) => handleOnMouseOut(e, i)}
                    >
                     <Link to={'/courses/course/' + course.id} state={{page: currentPage}} >
                        <div id="wrapper" >
                            <img src={imageLink} alt='' className={course.meta.courseVideoPreview ? '' : 'not-hide'} />
                           { course.meta.courseVideoPreview && <ReactHlsPlayer
                                src={course.meta.courseVideoPreview?.link}
                                autoPlay={false}
                                loop
                                controls={true}
                                muted
                                width='400px'
                                height="auto" 
                                playerRef={videoRefs.current[i]}
                            /> }
                        </div>
                        <div className="course-info">
                            <h3>{course.title}</h3>
                            <div className="flex">
                                <span className="rating">{course.rating}</span>
                                <Rating defaultValue={course.rating} precision={0.1} readOnly />
                                <span className="lessonsCount">{course.lessonsCount} lessons</span>
                            </div>
                           
                            { skills && <div className="flex">
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
            })

        return (
            <>
                 <div className="course-list">
                    {courseElements}
                 </div>
                <Pagination count={pagesCount} page={currentPage} onChange={handleChange} />
            </>
        )
    }

    const handleOnMouseOver = (e, i) => {
        videoRefs.current[i].current && videoRefs.current[i].current.play();
    }

    const handleOnMouseOut = (e, i) => {
        if( videoRefs.current[i].current) {
            videoRefs.current[i].current.pause()
            videoRefs.current[i].current.currentTime = 0
        }
    } 
        
    return (
        <div className="container">
            <h1 className="text-center">Courses</h1>
            <React.Suspense fallback={<h2>Loading ...</h2>}>
                <Await resolve={data.courses}>
                    {renderCourses}
                </Await>
            </React.Suspense>
        </div>
    )
}