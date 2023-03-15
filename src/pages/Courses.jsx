import React, { useEffect } from "react";
import {getCourses} from '../api'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import Pagination from '@mui/material/Pagination';

export default function Courses() {

    const navigate = useNavigate()
    const [courses, setCourses] = React.useState([])
    const [currentPage, setCurrentPage] = React.useState(1)

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
        return (
            <div key={course.id} className="course-tile">
             <Link to={'/courses/course/' + course.id} >
                <img src={imageLink} />
                <div className="course-info">
                    <h3>{course.title}</h3>
                    <p>Lessons count - {course.lessonsCount}</p>
                    <p>Rating - {course.rating}</p>
                    <p>Skills - {course.meta.skills}</p>
                </div>           
            </Link>
        </div> 
    )
    })
        

    return (
        <div>
            <h1 className="text-center">Courses</h1>
            <div className="course-list">
                {courseElements}
            </div>
            <Pagination count={pagesCount} page={currentPage} onChange={handleChange} />
        </div>
    )
}