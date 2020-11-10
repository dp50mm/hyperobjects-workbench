import React, { useContext } from 'react'
import Demo from './Demo'
import Workbench from 'components/Workbench'
import { StoreContext } from 'store/store'


const MainPage = ({

}) => {
  const { state, actions, selectedScript } = useContext(StoreContext)
  const { user } = state
  if(user === false) {
    return (
      <div className='main-page'>
        <Demo />
      </div>
    )
  }
  let script = '// select a script'
  if(selectedScript) {
    script = selectedScript.script
  }
  return (
    <div className="main-page">
      <Workbench
        script={script}
        scriptFromProp={user.changingSelectedScript}
        onChange={(newScript) => {
          if(newScript !== script) {
            actions.scriptUpdate({
              ...selectedScript,
              script: newScript
            })
          }
          
        }}
        />
      
    </div>
  );
}

export default MainPage