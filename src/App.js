import { useState, useContext } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import {
    UserProvider,
    UserContext
  } from '@dialectic-design/hyperobjects-user-context'
import {
    createStore
} from '@dialectic-design/hyperobjects-entity-context'
import MainMenu from 'components/MainMenu'
import CreateAccountPage from 'containers/CreateAccountPage';
import MainPage from 'containers/MainPage';
import 'semantic-ui-css/semantic.min.css';
import './App.scss';
import _ from 'lodash'

export const scriptStore = createStore('script')
const ScriptProvider = scriptStore.provider
export const ScriptContext = scriptStore.context

const App = () => {
    return (
        <UserProvider>
            <AppWithUser />
        </UserProvider>
    )
}

const AppWithUser = () => {
    const user = useContext(UserContext)
    return (
        <ScriptProvider user={user}>
            <AppWithUserAndScript />
        </ScriptProvider>
    )
}

const AppWithUserAndScript = () => {
    const scriptContext = useContext(ScriptContext)
    const [selectedScriptId, setSelectedScriptId] = useState(false)
    const selectedScript = _.get(scriptContext, `dict.${selectedScriptId}`, false)
    const uiState = {
        selectedScriptId,
        setSelectedScriptId,
        selectedScript
    }
    return (
            <Router>
                <div className="app">
                    <MainMenu uiState={uiState} />
                    <div className='page-content'>
                        <Switch>
                            <Route path='/create-account'>
                                <CreateAccountPage />
                            </Route>
                            <Route path='/'>
                                <MainPage uiState={uiState} />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
    )
}


export default App