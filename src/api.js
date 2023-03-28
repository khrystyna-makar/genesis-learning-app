import {CustomError} from './utilities/CustomError'

async function preRequestHeader() {
    const res = await fetch("/api/v1/auth/anonymous?platform=subscriptions") 
    if(!res.ok) {
        throw new CustomError("Failed to fetch token", res.status, res.statusText)
    }  
    const data = await res.json()
    return {
        'Authorization': 'Bearer ' + data.token
      }
}

export async function getCourses() {
    const header = await preRequestHeader()
    const res = await fetch("/api/v1/core/preview-courses", {headers: header}) 
    if(!res.ok) {
        throw new CustomError("Failed to fetch courses", res.status, res.statusText)
    }
    const data = await res.json()
    return data.courses
}

export async function getCourse(courseId) {
    const header = await preRequestHeader()
    const res = await fetch(`/api/v1/core/preview-courses/${courseId}`, {headers: header})
    if(!res.ok) {
        throw new CustomError("Failed to fetch course", res.status, res.statusText)
    }
    const data = await res.json()
    return data
}
