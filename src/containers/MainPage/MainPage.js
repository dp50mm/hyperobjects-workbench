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

    console.log(scriptsContext)
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
                        console.log('push new script to db')
                        scriptsContext.actions.updateScript({
                            ...selectedScript,
                            script: newScript
                        })
                    }
                }}
                />
        </div>
    )
}

export default MainPage