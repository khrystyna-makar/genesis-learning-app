import React, { useRef } from "react";
import { getCourses } from '../api'
import { useNavigate, useLocation, useLoaderData, defer, Await } from 'react-router-dom'
import Pagination from '@mui/material/Pagination';
import CourseTile from "../components/CourseTile";

export function loader() {
    return defer({ courses: getCourses() })
}

export default function Courses() {

    const navigate = useNavigate()
    const location = useLocation()
    const videoRefs = useRef([])

    let pageInPath = +location.pathname.slice(location.pathname.lastIndexOf('/') + 1, location.pathname.length);
    if (pageInPath === 0) {
        pageInPath = 1
    }

    const data = useLoaderData()

    const [currentPage, setCurrentPage] = React.useState(pageInPath)

    videoRefs.current = Array(10).fill().map((_, i) => videoRefs.current[i] || React.createRef());

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        navigate(`/courses/${value}`)
    };

    const coursesCountPerPage = 10;

    function renderCourses(courses) {

        const pagesCount = Math.ceil(courses?.length / coursesCountPerPage);

        const index = (currentPage - 1) * coursesCountPerPage;

        const coursesPage = courses?.sort(c => c.launchDate
        ).slice(index, index + coursesCountPerPage)

        const courseElements = coursesPage.map((course, i) => {
            return (
                <CourseTile course={course} videoRef={videoRefs.current[i]} currentPage={currentPage} />
            )
        })

        return (
            <>
                <div className="course-list">
                    {courseElements}
                </div>
                <Pagination count={pagesCount} page={currentPage} onChange={handlePageChange} />
            </>
        )
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