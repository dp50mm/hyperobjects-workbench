import types from '../actionTypes'

export const userActions = (dispatch) => {
    return {
        userLogIn: user => {
            dispatch({
                type: types.USER_LOG_IN,
                payload: user
            })
        },
        userLogInConfirmed: user => {
            dispatch({
                type: types.USER_LOG_IN_CONFIRMED,
                payload: user
            })
        },
        userLogInError: errorMessage => {
            dispatch({
                type: types.USER_LOG_IN_ERROR,
                payload: errorMessage
            })
        },
        userLogOut: () => {
            dispatch({
                type: types.USER_LOG_OUT
            })
        },
        userCheckSession: () => {
            dispatch({
                type: types.USER_CHECK_SESSION
            })
        },
        userLogOutConfirmed: () => {
            dispatch({
                type: types.USER_LOG_OUT_CONFIRMED
            })
        },
        userSignUp: user => {
            dispatch({
                type: types.USER_SIGN_UP,
                payload: user
            })
        },
        userSignUpError: errorMessage => {
            dispatch({
                type: types.USER_SIGN_UP_ERROR,
                payload: errorMessage
            })
        },
        userSignUpConfirmed: user => {
            dispatch({
                type: types.USER_SIGN_UP_CONFIRMED,
                payload: user
            })
        },

        getScriptsForUser: user => {
            dispatch({
                type: types.USER_GET_SCRIPTS,
                payload: user
            })
        },
        selectScript: scriptId => {
            dispatch({
                type: types.USER_SELECT_SCRIPT,
                payload: scriptId
            })
        }
    }
}