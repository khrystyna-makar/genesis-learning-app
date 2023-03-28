import React from "react";
import { Link, useLocation, useLoaderData, defer, Await } from 'react-router-dom'
import { getCourse } from '../api'
import ReactHlsPlayer from 'react-hls-player'
import Lesson from "../components/Lesson";
import LessonDialogContent from "../components/LessonDialogContent";
import Dialog from '@mui/material/Dialog';

export function loader({ params }) {
    return defer({ course: getCourse(params.id) })
}

export default function CourseDetail() {
    const location = useLocation()
    const page = location.state?.page || 1;

    const data = useLoaderData()

    const [currentLesson, setCurrentLesson] = React.useState(null)
    const [open, setOpen] = React.useState(false);

    const openLesson = (e, lesson) => {
        e.preventDefault();
        lesson.progress = Math.ceil(localStorage.getItem(lesson?.id) ?? 0);
        setCurrentLesson(lesson)
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    function renderCourse(course) {

        const lessons = course.lessons.sort((item1, item2) => item1.order - item2.order).map((lesson) =>
            <Lesson key={lesson.id} onClick={(e) => openLesson(e, lesson)} lesson={lesson} />
        );

        return (
            <>
                <h1>{course.title}</h1>
                <ReactHlsPlayer
                    src={course.meta.courseVideoPreview?.link}
                    autoPlay={false}
                    controls={true}
                    width="50%"
                    height="auto"
                />

                <p>{course.description}</p>
                <strong>What's inside:</strong>
                <ul className="lesson">{lessons}</ul>

                <Dialog
                    onClose={handleClose}
                    open={open}
                >
                    <LessonDialogContent lesson={currentLesson} close={handleClose} />
                </Dialog>
            </>
        )
    }

    return (
        <div className="container">
            <Link
                to={`/courses/${page}`}
                className="back-button"
            >&larr; <span>Back to courses</span></Link>
            <React.Suspense fallback={<h2>Loading ...</h2>}>
                <Await resolve={data.course}>
                    {renderCourse}
                </Await>
            </React.Suspense>
        </div>
    )
}