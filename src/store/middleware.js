import types from './actionTypes'
import {
    signUp,
    signIn,
    signOut,
    checkSession
} from 'util/session'
import {
    getScriptsForUser,
    createScript,
    updateScript
} from 'util/script'
import dayjs from 'dayjs'

let latestVersionStored = dayjs().clone().subtract(15, 'seconds')



export const applyMiddleware = dispatch => action => {
    switch(action.type) {
        case types.USER_SIGN_UP:
            signUp(action.payload)
                .then(resp => {
                    console.log(resp)
                    if(resp.status === 200) {
                        resp.json().then(user => {
                            dispatch({
                                type: types.USER_SIGN_UP_CONFIRMED,
                                payload: user
                            })
                        })
                    } else if(resp.status === 404) {
                        dispatch({
                            type: types.USER_SIGN_UP_ERROR,
                            payload: 'server not found'
                        })
                    } else {
                        try {
                            resp.json().then(error => {
                                console.log(error)
                                dispatch({
                                    type: types.USER_SIGN_UP_ERROR,
                                    payload: `${error.message}`
                                })
                            })
                        } catch(jsonParseError) {
                            console.log('json parse error')
                        }
                        
                        
                    }
                })
                .catch(err => {
                    console.log('sign up error')
                    console.log(err)
                    dispatch({
                        type: types.USER_SIGN_UP_ERROR,
                        payload: 'sign up error in request'
                    })
                })
            
            
            dispatch(action)
            break
        case types.USER_LOG_IN:
            signIn(action.payload)
                .then(resp => {
                    if(resp.status === 200) {
                        resp.json().then(user => {
                            dispatch({
                                type: types.USER_LOG_IN_CONFIRMED,
                                payload: user
                            })
                        })
                    } else {
                        resp.json().then(error => {
                            dispatch({
                                type: types.USER_LOG_IN_ERROR,
                                payload: `${error.message}`
                            })
                        })
                    }
                })
                .catch(err => {
                    dispatch({
                        type: types.USER_LOG_IN_ERROR,
                        payload: 'sign in request error'
                    })
                })
            dispatch(action)
            break
        case types.USER_LOG_OUT:
            signOut().then(resp => {
                dispatch({
                    type: types.USER_LOG_OUT_CONFIRMED
                })
            })
            dispatch(action)
            break
        case types.USER_CHECK_SESSION:
            checkSession()
                .then(resp => {
                    if(resp.status === 200) {
                        resp.json().then(user => {
                            dispatch({
                                type: types.USER_LOG_IN_CONFIRMED,
                                payload: user
                            })
                        })
                    }
                })
                .catch(err => {
                })
            dispatch(action)
            break
        case types.USER_GET_SCRIPTS:
            getScriptsForUser()
                .then(resp => {
                    if(resp.status === 200) {
                        resp.json().then(scripts => {
                            dispatch({
                                type: types.USER_SET_SCRIPTS,
                                payload: scripts
                            })
                        })
                    } else if(resp.status === 404) {
                        dispatch({
                            type: types.USER_GET_SCRIPTS_ERROR,
                            payload: 'error getting scripts'
                        })
                    } else {
                        dispatch({
                            type: types.USER_GET_SCRIPTS_ERROR,
                            payload: 'error getting scripts'
                        })
                    }
                })
            dispatch(action)
            break
        case types.USER_SELECT_SCRIPT:
            setTimeout(() => {
                dispatch({
                    type: types.USER_SELECT_SCRIPT_UPDATED
                })
            }, 10)
            dispatch(action)
            break
        case types.SCRIPT_CREATE:
            createScript({name: action.payload})
                .then(resp => {
                    if(resp.status === 200) {
                        resp.json().then(script => {
                            dispatch({
                                type: types.SCRIPT_CREATE_CONFIRMED,
                                payload: script
                            })
                            dispatch({
                                type: types.USER_SELECT_SCRIPT,
                                payload: script.scriptId
                            })
                        })
                    } else if(resp.status === 404) {
                        dispatch({
                            type: types.SCRIPT_CREATE_ERROR,
                            payload: '404 error when creating script'
                        })
                    } else {
                        resp.json().then(error => {
                            dispatch({
                                type: types.SCRIPT_CREATE_ERROR,
                                payload: error
                            })
                        })
                    }
                })
            dispatch(action)
            break
        case types.SCRIPT_UPDATE:
            let storeVersion = false
            if(Math.abs(latestVersionStored.diff(dayjs(), 'seconds')) > 20) {
                storeVersion = true
                latestVersionStored = dayjs()
                console.log('store new version for script', storeVersion)
            }
            updateScript({
                ...action.payload,
                storeVersion: storeVersion
                }).then(resp => {
                    if(resp.status === 200) {
                        dispatch({
                            type: types.SCRIPT_UPDATE_CONFIRMED,
                            payload: {
                                scriptId: action.payload.scriptId
                            }
                        })
                    } else {
                        dispatch({
                            type: types.SCRIPT_UPDATE_ERROR,
                            payload: {
                                scriptId: action.payload.scriptId,
                                message: "error storing script update"
                            }
                        })
                    }
                })
            dispatch(action)
            break
        default: dispatch(action)
    }
}