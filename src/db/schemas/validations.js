export function validateHour() {
    const regexHora = /^([01]\d|2[0-3]):([0-5]\d)$/
    return [(hour)=>regexHora.test(hour),"Time Format invalid, the valid format is HH:MM:SS (00:00 a 23:59)."]
}


export function constainsSpace() {
    return [(text)=>(!(/\s/.test(text))), "{PATH} Can't contain spaces."]
}

 
export function validateUrl() {
    const urlRegex = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g
    return [(url)=>urlRegex.test(url),"{PATH} Invalid URL format"]
}

export function validateEmail(){
    const emailRegex= /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    return [(email)=>emailRegex.test(email), "{PATH} Invalid Email format "]
}