export function constainsSpace() {
    return [(text) => (!(/\s/.test(text))), "{VALUE} Can't contain spaces."]
}

export function validatePassword() {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
    return [(password) => passwordRegex.test(password), "The password ({VALUE}) must contain at least one lowercase letter, one uppercase letter, and one digit, with a minimum length of 8 characters"]
}

export function validateUrl() {
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/
    return [(url) => urlRegex.test(url), "Invalid URL format"];
}

export function validateEmail() {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    return [(email) => emailRegex.test(email), "Invalid Email format "]
}