export function getUserName() {
    return sessionStorage.getItem("username");
}

export function setUserName(value) {
    sessionStorage.setItem("username", value)
}
export function removeUserName() {
    sessionStorage.removeItem("username")
}