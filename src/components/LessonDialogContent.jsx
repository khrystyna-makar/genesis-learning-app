import React, { useRef } from "react"
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import ReactHlsPlayer from 'react-hls-player'

function CustomDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <button title="Close"
                    onClick={onClose}
                    style={{position: 'absolute', top: '8px', right:'8px'}}
                >
                    <span className="material-icons">close</span>
                </button>
            ) : null}
        </DialogTitle>
    );
}

CustomDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function LessonDialogContent({ lesson, close }) {
    const lessonPlayer = useRef()

    const handleKeyUp = (e) => {
        if (e.shiftKey && e.key === '>') {
            if (lessonPlayer.current.playbackRate < 2) {
                lessonPlayer.current.playbackRate += 0.25;
            }
        } else if (e.shiftKey && e.key === '<') {
            if (lessonPlayer.current.playbackRate > 0.25) {
                lessonPlayer.current.playbackRate -= 0.25;
            }
        }
    }

    return (
        <>
            <CustomDialogTitle onClose={close}>
                {'Lesson ' + lesson?.order + '. '}{lesson?.title}
            </CustomDialogTitle>
            <DialogContent dividers>
                <ReactHlsPlayer
                    onKeyUp={(e) => handleKeyUp(e)}
                    src={lesson?.link}
                    playerRef={lessonPlayer}
                    autoPlay={false}
                    controls={true}
                    width="100%"
                    height="auto"
                    hlsConfig={{
                        startPosition: lesson?.progress
                    }}
                />
                <pre>Decrease playback rate  &#60; (SHIFT+,)</pre>
                <pre>Increase playback rate  &#62; (SHIFT+.)</pre>
            </DialogContent>
        </>
    );
}