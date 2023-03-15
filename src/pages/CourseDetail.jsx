import React from "react";
import {Link} from 'react-router-dom'

export default function CourseDetail() {

    return (
        <div>
             <Link
                to=".."
                className="back-button"
            >&larr; <span>Back to all courses</span></Link>

            <h1>Course detail</h1>
        </div>
    )
}