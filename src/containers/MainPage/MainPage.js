import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '@dialectic-design/hyperobjects-user-context'
import { ScriptContext } from 'App'
import Demo from './Demo'
import _ from 'lodash'
import Workbench from 'components/Workbench'
import Modals from './Modals'
import dayjs from 'dayjs'

let latestVersionStored = dayjs().clone().subtract(5, 'seconds')

const MainPage = ({
    uiState
}) => {
    const user = useContext(UserContext)
    const scriptsContext = useContext(ScriptContext)
    const [currentScriptId, setCurrentScriptId] = useState(false)
    const selectedScript = _.get(uiState, 'selectedScript', false)
    let script = _.get(selectedScript, 'script', '// select a script')
    let moduleScript = _.get(selectedScript, "moduleScript", false)
    if(!_.get(selectedScript, "isModule", false)) {
        moduleScript = false
    }
    var modules = scriptsContext.list.filter(p => _.get(p, "isModule", false))
    var scriptFromProp = currentScriptId !== _.get(selectedScript, '_id', false)
    useEffect(() => {
        if(currentScriptId !== _.get(selectedScript, '_id', false)) {
            setCurrentScriptId(_.get(selectedScript, '_id', false))
        }
    })
    if(!user.authenticated) {
        return (
            <div className='main-page'>
                <Demo />
            </div>
        )
    }
    
    return (
        <div className='main-page'>
            <Modals uiState={uiState} />
            <Workbench
                name={_.get(selectedScript, 'name', 'no script name')}
                script={script}
                moduleScript={moduleScript}
                scriptFromProp={scriptFromProp}
                autoRun={uiState.autoRun}
                modules={modules}
                onChange={(newScript, newModuleScript) => {
                    if(selectedScript && (newScript !== script || newModuleScript !== moduleScript)) {
                        var storeVersion = false
                        if (dayjs().diff(latestVersionStored, 'second') > 30) {
                            storeVersion = true
                            latestVersionStored = dayjs()
                        }
                        scriptsContext.actions.updateScript({
                            ...selectedScript,
                            script: newScript,
                            moduleScript: newModuleScript,
                            storeVersion: storeVersion
                        })
                    }
                }}
                />
        </div>
    )
}

export default MainPage