import types from '../actionTypes'

export const initialScriptState = {
    name: false,
    creating: false,
    createError: false,
    storing: false,
    storeError: false,
    storeSuccessful: false,
    script: false
}

export const scriptReducer = (state = initialScriptState, action) => {
    switch(action.type) {
        case types.SCRIPT_UPDATE:
            return {
                ...state,
                script: action.payload.script,
                storing: true
            }
        case types.SCRIPT_UPDATE_CONFIRMED:
            return {
                ...state,
                storing: false,
                storeSuccessful: true,
                storeError: false
            }
        case types.SCRIPT_UPDATE_ERROR:
            return {
                ...state,
                storing: false,
                storeError: action.payload
            }
        default: return state
    }
}