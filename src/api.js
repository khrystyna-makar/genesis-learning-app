
async function preRequestHeader() {
    
    const res = await fetch("/api/v1/auth/anonymous?platform=subscriptions") 
    if(!res.ok) {
        throw {
            message: "Failed to fetch token",
            statusText: res.statusText,
            status: res.status
        }
    }  
    const data = await res.json()
    
    return {
        'Authorization': 'Bearer ' + data.token
      }
}


export async function getCourses() {
  
    const header = await preRequestHeader()
    console.log(header)
   
    const res = await fetch("/api/v1/core/preview-courses", {headers: header}) 
    if(!res.ok) {
        throw {
            message: "Failed to fetch courses",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    console.log(data)
    return data.courses
}

export async function getCourse(courseId) {
    const header = await preRequestHeader()

    const res = await fetch(`/api/v1/core/preview-courses/${courseId}`, {headers: header})
    if(!res.ok) {
        throw {
            message: "Failed to fetch course",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    console.log(data)
    return data
}
