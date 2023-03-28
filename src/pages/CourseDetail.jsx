import React, { useRef } from "react";
import { Link, useLocation, useLoaderData, defer, Await } from 'react-router-dom'
import { getCourse } from '../api'
import ReactHlsPlayer from 'react-hls-player'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Lesson from "../components/Lesson";

export function loader({ params }) {
    return defer({ course: getCourse(params.id) })
}

export default function CourseDetail() {
    const location = useLocation()
    const page = location.state?.page || 1;
    const videoPlayer = useRef()
    const lessonPlayer = useRef()

    const data = useLoaderData()

    const [currentLesson, setCurrentLesson] = React.useState(null)
    const [open, setOpen] = React.useState(false);

    const openLesson = (e, lesson) => {
        console.log('open lesson')
        e.preventDefault();
        lesson.progress = Math.ceil(localStorage.getItem(lesson?.id) ?? 0);
        setCurrentLesson(lesson)
        setOpen(true);
    }

    const handleClose = () => {
        localStorage.setItem(currentLesson?.id, lessonPlayer.current.currentTime);
        setOpen(false);
    };

    const handleKeyUp = (e) => {
        if (e.shiftKey && e.key === '>') {
            if (lessonPlayer.current.playbackRate < 2) {
                lessonPlayer.current.playbackRate += 0.25;
            }
            console.log(lessonPlayer.current.playbackRate)
        } else if (e.shiftKey && e.key === '<') {
            if (lessonPlayer.current.playbackRate > 0.25) {
                lessonPlayer.current.playbackRate -= 0.25;
            }
            console.log(lessonPlayer.current.playbackRate)
        }
    }

    function renderCourse(course) {

        const lessons = course.lessons.sort((item1, item2) => item1.order - item2.order).map((lesson) =>
            <Lesson key={lesson.id} onClick={(e) => openLesson(e, lesson)} lesson={lesson}/>
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
                    playerRef={videoPlayer}
                />

                <p>{course.description}</p>
                <strong>What's inside:</strong>
                <ul className="lesson">{lessons}</ul>

                <Dialog
                    onClose={handleClose}
                    open={open} >
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        {'Lesson ' + currentLesson?.order + '. '}{currentLesson?.title}
                    </DialogTitle>
                    <DialogContent dividers>
                        <ReactHlsPlayer
                            onKeyUp={(e) => handleKeyUp(e)}
                            src={currentLesson?.link}
                            playerRef={lessonPlayer}
                            autoPlay={false}
                            controls={true}
                            width="100%"
                            height="auto"
                            hlsConfig={{
                                startPosition: currentLesson?.progress
                            }}
                        />
                        <pre>Decrease playback rate  &#60; (SHIFT+,)</pre>
                        <pre>Increase playback rate  &#62; (SHIFT+.)</pre>
                    </DialogContent>
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