import React, { useEffect } from "react";
import {getCourses} from '../api'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import Pagination from '@mui/material/Pagination';
import Rating from '@mui/material/Rating';

export default function Courses() {

    const navigate = useNavigate()
    const location = useLocation()
   
    let pageInPath = +location.pathname.slice(location.pathname.lastIndexOf('/') +1, location.pathname.length);
    if(pageInPath === 0) {
        pageInPath = 1
    }
    
    const [courses, setCourses] = React.useState([])
    const [currentPage, setCurrentPage] = React.useState(pageInPath)

    const handleChange = (event, value) => {
        setCurrentPage(value);
        navigate(`/courses/${value}`)
      };

    useEffect( () => {
        console.log('useEffect - getCourses()')
        getCourses().then(res => {
            console.log(res);
            setCourses(res);
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const coursesCountPerPage = 10;

    const pagesCount = Math.ceil(courses.length / coursesCountPerPage);

    const index = (currentPage - 1)*coursesCountPerPage;
  
    const coursesPage = courses.sort(c => c.launchDate
        ).slice(index, index + coursesCountPerPage)

    const courseElements = coursesPage.map(course => {
        let imageLink = course.previewImageLink + '/cover.webp'
        const skills = course.meta.skills.map((skill) =>
                <li>{skill}</li>
                );
        return (
            <div key={course.id} className="course-tile">
             <Link to={'/courses/course/' + course.id} state={{page: currentPage}} >
                <img src={imageLink} />
                <div className="course-info">
                    <h3>{course.title}</h3>
                    <p>{course.lessonsCount} lessons</p>
                    <p className="flex">
                        <span className="rating">{course.rating}</span>
                        <Rating name="half-rating-read" defaultValue={course.rating} precision={0.1} readOnly />
                    </p>
                    <p>Skills</p>
                    <ul>
                      {skills}
                    </ul>
                </div>           
            </Link>
        </div> 
    )
    })
        
    return (
        <div className="container">
            <h1 className="text-center">Courses</h1>
            <div className="course-list">
                {courseElements}
            </div>
            <Pagination count={pagesCount} page={currentPage} onChange={handleChange} />
        </div>
    )
}