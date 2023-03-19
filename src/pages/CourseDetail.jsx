import React, { useEffect, useRef } from "react";
import {Link, useLocation, useParams} from 'react-router-dom'
import {getCourse} from '../api'
import ReactHlsPlayer from 'react-hls-player'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';


function convertDuration(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes} min ${seconds} s`;
}

export default function CourseDetail() {
    const location = useLocation()
    const params = useParams();
    const page = location.state?.page || 1;
    const videoPlayer = useRef()
    const lessonPlayer = useRef()

    const [course, setCourse] = React.useState(null) 
    const [currentLesson, setCurrentLesson] = React.useState(null)
    const [open, setOpen] = React.useState(false);

    useEffect( () => {
        getCourse(params.id).then(res => {
            console.log(res);
            setCourse(res);
        }).catch(err => {
            console.log(err)
        })
    }, [params.id])

    if(!course) {
        return (
            <div className="container">
                 <h1>Loading...</h1>
            </div>
        )
    }

    const openLesson = (e, lesson) => {
        e.preventDefault();    
        lesson.progress = Math.ceil(localStorage.getItem(lesson?.id) ?? 0) ; 
        setCurrentLesson(lesson)  
        setOpen(true);
    }

    const handleClose = () => {
        localStorage.setItem(currentLesson?.id, lessonPlayer.current.currentTime);
        setOpen(false);
      };

    const handleKeyUp = (e) => {
        console.log("key")
        if (e.shiftKey  && e.key === '>') {
            if( lessonPlayer.current.playbackRate < 2) {
                lessonPlayer.current.playbackRate += 0.25;
            }
            console.log(lessonPlayer.current.playbackRate)
        } else if (e.shiftKey  && e.key === '<') {
            if( lessonPlayer.current.playbackRate > 0.25) {
                lessonPlayer.current.playbackRate -= 0.25;
            }
            console.log(lessonPlayer.current.playbackRate)
        }
    }

    const lessons = course.lessons.sort((item1, item2) => item1.order - item2.order).map((lesson) =>
            <Link key={lesson.id} onClick={(e) => openLesson(e, lesson)} className={lesson.status === 'locked' ? 'link-disabled' : ''}>
                <div title={lesson.status === 'locked' ? 'This lesson is locked' : ''}>
                    {
                    lesson.status === 'locked' ? <span className="material-icons" style={{color:'#666666', margin: '0 10px'}} >lock</span> :
                    <span className="material-icons" style={{color:'#666666', margin: '0 10px'}} >play_circle_outline</span>
                    } 
                    <span>{lesson.order + '.'} &nbsp; </span>
                    <span>{lesson.title}</span>
                   {// <span style={{color: '#666666'}}> &nbsp; {lesson.progress ?? 0}%</span>
                    }
                    <span className="duration">{convertDuration(lesson.duration)}</span>  
                </div>
            </Link>     
    );

    return (
        <div className="container">
             <Link
                to={`/courses/${page}`}
                className="back-button"
            >&larr; <span>Back to courses</span></Link>

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
                aria-labelledby="customized-dialog-title"
                open={open}
            >
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

        </div>
    )
}