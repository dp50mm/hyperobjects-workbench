import { useState, useRef, useEffect } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import {
  Menu,
  Container
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './App.scss';
import { StoreProvider } from 'store/store'
import MainPage from 'containers/MainPage';
import MainMenu from 'components/MainMenu';
import CreateAccountPage from 'containers/CreateAccountPage';
import AccountPage from 'containers/AccountPage'

const App = () => {
  return (
    <StoreProvider>
      <Router>
        <div className='app'>
          <MainMenu />
          <div className='page-content'>
            <Switch>
              <Route path='/create-account'>
                <CreateAccountPage />
              </Route>
              <Route path='/account'>
                <AccountPage />
              </Route>
              <Route path="/">
                <MainPage />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </StoreProvider>
  )
}


export default App;
