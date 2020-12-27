import React, { useContext, useState } from 'react'
import { UserContext } from '@dialectic-design/hyperobjects-user-context'
import { ScriptContext } from 'App'
import Demo from './Demo'
import _ from 'lodash'
import Workbench from 'components/Workbench'

const MainPage = ({
    uiState
}) => {
    const user = useContext(UserContext)
    const scriptsContext = useContext(ScriptContext)

    const selectedScript = _.get(uiState, 'selectedScript', false)
    let script = _.get(selectedScript, 'script', '// select a script')
    
    if(!user.authenticated) {
        return (
            <div className='main-page'>
                <Demo />
            </div>
        )
    }
    return (
        <div className='main-page'>
            <Workbench
                script={script}
                scriptFromProp={true}
                onChange={(newScript) => {
                    if(selectedScript && newScript !== script) {
                        scriptsContext.actions.updateScript({
                            ...selectedScript,
                            script: newScript,
                            storeVersion: true
                        })
                    }
                }}
                />
        </div>
    )
}

export default MainPage