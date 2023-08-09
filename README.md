<aside>
💡 Task — create application for learning.  
  <br/> <br/>
  API — https://www.postman.com/aninix/workspace/genesis-front-end-school/overview  <br/><br/>

App has 2 pages:  
  - pages with courses;  
  - page with course overview;   
  ##
Details:

- The last 10 courses must be displayed in courses feed. The course includes:
    - Image
    - Course title
    - Number of lessons, skills and rating
    - Display 10 courses on the page and add pagination
    - Additionally:
        - on hover play video without sound.
- The course view page displays the first video from the course, details about the course and a list of lessons:
    - When clicking on a lesson (if it is not blocked), the current video will open for viewing, the user must understand which lesson from the course he is viewing.
    - Video viewing progress and course lesson progress  must be saved (locally).
    - If the lesson is blocked, show it to the user.
    - Additionally:
        1. Make a functional picture in picture (without third-party libraries):
            - The video can be displayed on top of the page when clicked. At the same time, the video is located in the lower right corner of the page and you can go to other pages.
        2. Add a change of the video playback speed via the keyboard (without third-party libraries) (key combination at your discretion):
            - Also display information about how to use it next to the video.

Additional tasks:
- handling errors from the API (network error, ...);
- adaptive for the mobile version;
- video loading animation;
- the code is covered by tests;

##
When working with videos, we recommend using hls.js.

</aside>
