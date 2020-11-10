export const createScript = scriptName => {
    return fetch('api/script', {
        method: "POST",
        body: JSON.stringify(scriptName),
        headers: {
            "Content-Type":"application/json"
        }
    })
}

export const getScriptsForUser = () => {
    return fetch(`api/script/user-scripts`)
}

export const updateScript = (script) => {
    return fetch('api/script', {
        method: "PUT",
        body: JSON.stringify({
            ...script,
            newScriptText: script.script
        }),
        headers: {
            'Content-Type':'application/json'
        }
    })
}