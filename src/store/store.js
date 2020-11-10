import React, { createContext, useReducer, useEffect } from 'react'
import { reducer, initialState } from './reducer'
import { useActions } from './actions'
import { applyMiddleware } from './middleware'
import _ from 'lodash'

const StoreContext = createContext()

let checkedSession = false
let initialSelectedScriptSet = false

const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const actions = useActions(state, applyMiddleware(dispatch))
    useEffect(() => {
        if(state.user.checkedSession === false && checkedSession === false) {
            checkedSession = true
            actions.userCheckSession()
        }
        if(state.user.authenticated && state.user.checkedScripts === false) {
            actions.getScriptsForUser()
        }
        if(state.user.authenticated && state.user.scripts.length > 0 && initialSelectedScriptSet === false) {
            let scripts = state.user.scripts.slice()
            scripts = _.sortBy(scripts, 'updatedAt').reverse()
            actions.selectScript(scripts[0].scriptId)
            initialSelectedScriptSet = true
        }
    })
    let selectedScriptId = _.get(state.user, 'selectedScriptId', false)
    let selectedScript = false
    if(selectedScriptId) {
        selectedScript = _.find(state.user.scripts, p => p.scriptId === selectedScriptId)
    }
    if(selectedScript === undefined) {
        selectedScript = false
    }
    return (
        <StoreContext.Provider
            value={{
                state,
                actions,
                selectedScript: selectedScript
                }}>
            {children}
        </StoreContext.Provider>
    )
}

export { StoreContext, StoreProvider }