export const signUp = user => {
    return fetch("api/users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type":"application/json"
        }
    })
}

export const signIn = user => {
    console.log('sign in user on session')
    return fetch('api/session', {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type":"application/json"
        }
    })
}

export const signOut = () => {
    return fetch('api/session', {
        method: "DELETE"
    })
}

export const checkSession = () => {
    return fetch('api/session')
}