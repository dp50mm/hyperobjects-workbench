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
    console.log('sign in user on session')
    return fetch(apiUrl + 'api/session', {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type":"application/json"
        }
    })
}

export const signOut = () => {
    return fetch(apiUrl + 'api/session', {
        method: "DELETE"
    })
}

export const checkSession = () => {
    return fetch(apiUrl + 'api/session')
}