import types from '../actionTypes'
import { scriptReducer, initialScriptState } from './scriptReducer'
import _ from 'lodash'

export const initialUserState = {
    checkedSession: false,
    authenticated: false,
    authenticating: false,
    authenticationError: false,
    signingUp: false,
    signUpError: false,
    accountCreationSuccessful: false,
    checkingScripts: false,
    checkedScripts: false,
    creatingScript: false,
    creatingScriptSuccessful: false,
    changingSelectedScript: false,
    scripts: []
}

const userReducer = (state = initialUserState, action) => {
    if(action.type.startsWith('USER_')) {
        switch(action.type) {
            case types.USER_LOG_IN:
                return {
                    ...state,
                    authenticating: true
                }
            case types.USER_LOG_IN_CONFIRMED:
                return {
                    ...state,
                    ...action.payload,
                    authenticated: true,
                    checkedSession: true,
                    authenticating: false,
                    signingUp: false,
                    authenticationError: false
                }
            case types.USER_LOG_IN_ERROR:
                return {
                    ...state,
                    authenticationError: action.payload,
                    authenticated: false,
                    authenticating: false
                }
            case types.USER_LOG_OUT:
                return {...initialUserState, checkedSession: true}
            case types.USER_LOG_OUT_CONFIRMED:
                return {...initialUserState, checkedSession: true}
            case types.USER_CHECK_SESSION:
                return {
                    ...state,
                    checkedSession: true
                }
            
            case types.USER_SIGN_UP:
                return {
                    ...state,
                    signingUp: true
                }
            case types.USER_SIGN_UP_ERROR:
                console.log(action)
                return {
                    ...state,
                    signingUp: false,
                    signUpError: action.payload
                }
            case types.USER_SIGN_UP_CONFIRMED:
                return {
                    ...state,
                    authenticated: true,
                    checkedSession: true,
                    accountCreationSuccessful: true,
                    ...action.payload
    
                }
            case types.USER_GET_SCRIPTS:
                return {
                    ...state,
                    checkingScripts: true,
                    checkedScripts: true
                }
            case types.USER_SET_SCRIPTS:
                return {
                    ...state,
                    checkingScripts: false,
                    scripts: action.payload
                }

            case types.USER_SELECT_SCRIPT:
                return {
                    ...state,
                    changingSelectedScript: true,
                    selectedScriptId: action.payload
                }
            case types.USER_SELECT_SCRIPT_UPDATED:
                return {
                    ...state,
                    changingSelectedScript: false
                }
            default: return state
        }
    } else if (action.type.startsWith('SCRIPT_')) {
        switch (action.type) {
            case types.SCRIPT_CREATE:
                let newScriptsForUser = state.scripts.slice()
                newScriptsForUser.push({
                    ...initialScriptState,
                    name: action.payload,
                    creating: true
                })
                return {
                    ...state,
                    creatingScript: true,
                    scripts: newScriptsForUser
                }
            case types.SCRIPT_CREATE_CONFIRMED:
                return {
                    ...state,
                    creatingScript: false,
                    creatingScriptSuccessful: true,
                    selectedScriptId: action.payload.scriptId,
                    scripts: state.scripts.map(script => {
                        if(script.name === action.payload.name && script.creating) {
                            return {
                                ...script,
                                name: action.payload.name,
                                script: action.payload.script,
                                scriptId: action.payload.scriptId,
                                creating: false,
                                new: true,
                                selected: true
                            }
                        } else {
                            return {...script, selected: false }
                        }
                    })
                }
            case types.SCRIPT_CREATE_ERROR:
                return {
                    ...state,
                    creatingScript: false,
                    creatingScriptError: action.payload.message
                }
            case types.SCRIPT_CREATE_RESET_PARAMETERS:
                return {
                    ...state,
                    creatingScript: false,
                    creatingScriptError: false,
                    creatingScriptSuccessful: false,
                    scripts: state.scripts.map(script => {
                        return {
                            ...script,
                            new: false
                        }
                    })
                }
            default:
                return {
                    ...state,
                    scripts: state.scripts.map(script => {
                        if(!_.has(action.payload, 'scriptId')) {
                            console.log(action, 'doesnt have a script id yet')
                        }
                        if(script.scriptId === action.payload.scriptId) {
                            return scriptReducer(script, action)
                        } else {
                            return script
                        }
                    })
                }
        }
    } else {
        return state
    }
}

export default userReducer