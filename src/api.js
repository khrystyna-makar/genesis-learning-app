export async function getCourses() {
    const res = await fetch("http://api.wisey.app/api/v1/core/preview-courses") 
    if(!res.ok) {
        throw {
            message: "Failed to fetch courses",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.courses
}

export async function getCourse(courseId) {
    const res = await fetch(`http://api.wisey.app/api/v1/core/preview-courses/:${courseId}`)
    if(!res.ok) {
        throw {
            message: "Failed to fetch course",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data
}
