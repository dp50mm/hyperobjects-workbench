import types from './actionTypes'
import { userActions } from './modelActions/userActions'
import { scriptActions } from './modelActions/scriptActions'

export const useActions = (state, dispatch) => {
    let userActionsWithDispatch = userActions(dispatch)
    let scriptActionsWithDispatch = scriptActions(dispatch)
    return {
        ...userActionsWithDispatch,
        ...scriptActionsWithDispatch
    }
}