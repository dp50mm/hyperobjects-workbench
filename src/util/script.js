import {
    apiUrl
} from 'constants/url'

export const createScript = scriptName => {
    return fetch(apiUrl + 'api/script', {
        method: "POST",
        body: JSON.stringify(scriptName),
        credentials: 'include',
        headers: {
            "Content-Type":"application/json"
        }
    })
}

export const getScriptsForUser = () => {
    return fetch(apiUrl + `api/script/user-scripts`, {credentials: 'include'})
}

export const updateScript = (script) => {
    return fetch(apiUrl + 'api/script', {
        method: "PUT",
        credentials: 'include',
        body: JSON.stringify({
            ...script,
            newScriptText: script.script
        }),
        headers: {
            'Content-Type':'application/json'
        }
    })
}