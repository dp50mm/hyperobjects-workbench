import types from '../actionTypes'

export const scriptActions = (dispatch) => {
    return {
        scriptCreateResetParameters: () => {
            dispatch({
                type: types.SCRIPT_CREATE_RESET_PARAMETERS
            })
        },
        scriptCreate: script => {
            dispatch({
                type: types.SCRIPT_CREATE,
                payload: script
            })
        },
        scriptCreateConfirmed: script => {
            dispatch({
                type: types.SCRIPT_CREATE_CONFIRMED,
                payload: script
            })
        },
        scriptCreateError: error => {
            dispatch({
                type: types.SCRIPT_CREATE_ERROR,
                payload: {
                    message: error
                }
            })
        },
        scriptUpdate: script => {
            dispatch({
                type: types.SCRIPT_UPDATE,
                payload: script
            })
        },
        scriptUpdateConfirmed: script => {
            dispatch({
                type: types.SCRIPT_UPDATE_CONFIRMED,
                payload: script
            })
        },
        scriptUpdateError: error => {
            dispatch({
                type: types.SCRIPT_UPDATE_ERROR,
                payload: {
                    message: error
                }
            })
        }
    }
}