import React from "react"
import { Link } from 'react-router-dom'
import { convertDuration } from "../utilities/utils";

export default function Lesson({ lesson, onClick }) {

    return (
        <Link key={lesson.id} onClick={onClick} className={lesson.status === 'locked' ? 'link-disabled' : ''}>
            <div title={lesson.status === 'locked' ? 'This lesson is locked' : ''}>
                {
                    lesson.status === 'locked' ? <span className="material-icons" style={{ color: '#666666', margin: '0 10px' }} >lock</span> :
                        <span className="material-icons" style={{ color: '#666666', margin: '0 10px' }} >play_circle_outline</span>
                }
                <span>{lesson.order + '.'} &nbsp; </span>
                <span>{lesson.title}</span>
                <span className="duration">{convertDuration(lesson.duration)}</span>
            </div>
        </Link>
    )
}