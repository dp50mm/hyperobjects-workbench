import {
    apiUrl
} from 'constants/url'

export const signUp = user => {
    return fetch(apiUrl + "api/users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type":"application/json"
        }
    })
}

export const signIn = user => {
    return fetch(apiUrl + 'api/session', {
        method: "POST",
        body: JSON.stringify(user),
        // credentials: 'include',
        headers: {
            "Content-Type":"application/json",
            "Hyperobjects-Service":"Workbench"
        }
    })
}

export const signOut = () => {
    return fetch(apiUrl + 'api/session', {
        method: "DELETE",
        credentials: 'include'
    })
}

export const checkSession = () => {
    return fetch(apiUrl + 'api/session', {credentials: 'include'})
}