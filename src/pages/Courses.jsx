import React, { useEffect } from "react";
import {getCourses} from '../api'
import {Link} from 'react-router-dom'

export default function Courses() {

    const [courses, setCourses] = React.useState([])

    useEffect( () => {
        getCourses().then(res => {
            console.log(res);
            setCourses(res);
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const courseElements = courses.map(course => {
        let imageLink = course.previewImageLink + '/cover.webp'
        return (
            <div key={course.id} className="course-tile">
             <Link to={'/courses/' + course.id} >
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
            <h1>Courses</h1>
            <div className="course-list">
                {courseElements}
            </div>
        </div>
    )
}