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
import '@dialectic-design/hyperobjects-entity-context/dist/index.css'
import '@dialectic-design/hyperobjects-user-context/dist/index.css'
import './App.scss';
import _ from 'lodash'
import AccountPage from 'containers/AccountPage'
import SharePage from 'containers/SharePage'

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
    const [autoRun, setAutoRun] = useState(true)
    const [mainPageModal, setMainPageModal] = useState(false)
    const selectedScript = _.get(scriptContext, `dict.${selectedScriptId}`, false)
    const uiState = {
        selectedScriptId,
        setSelectedScriptId,
        selectedScript,
        autoRun,
        setAutoRun,
        mainPageModal,
        setMainPageModal
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
                            <Route path='/account'>
                                <AccountPage />
                            </Route>
                            <Route path="/share">
                                <SharePage />
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