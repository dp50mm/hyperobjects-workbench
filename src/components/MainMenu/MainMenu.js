import React, { useContext, useState } from 'react'
import {
    Link
} from 'react-router-dom'
import {
    Menu,
    Container,
    Button,
    Modal,
    Dropdown,
    Loader,
    Message,
    Icon
} from 'semantic-ui-react'
import {
    UserContext,
    LoginForm
} from '@dialectic-design/hyperobjects-user-context'
import {
    NewEntityForm
} from '@dialectic-design/hyperobjects-entity-context'
import './main-menu.scss'
import {
    ScriptContext
} from 'App'
import _ from 'lodash'

const MainMenu = ({
    uiState
}) => {
    const user = useContext(UserContext)
    const scriptsContext = useContext(ScriptContext)
    const [modal, setModal] = useState(false)
    let scriptsForMenu = []
    scriptsContext.list.forEach(script => {
        scriptsForMenu.push({
            key: script._id,
            value: script._id,
            text: script.name
        })
    })
    let selectedScriptId = _.get(uiState, 'selectedScriptId', false)
    let selectedScript = false
    let selectedScriptvalue = false
    if(selectedScriptId) {
        selectedScript = _.get(uiState, 'selectedScript', false)
        selectedScriptvalue = selectedScript._id
    }
    return (
        <React.Fragment>
            <Modal
                open={modal === 'login-modal'}
                onClose={() => setModal(false)}
                closeIcon
                size="mini"
                >
                <Modal.Content>
                    <LoginForm />
                </Modal.Content>
            </Modal>
            <Modal
                open={modal === 'new-script-modal'}
                onClose={() => {
                    console.log(scriptsContext)
                    setModal(false)
                }}
                closeIcon
                size="mini"
                >
                <Modal.Content>
                    <NewEntityForm context={ScriptContext} />
                </Modal.Content>
            </Modal>
            <Menu inverted className='main-menu'>
                <Container fluid>
                    <Link to='/'>
                        <Menu.Item as='a' header>
                            Hyperobjects workbench
                        </Menu.Item>
                    </Link>
                    {user.authenticated === false ? (
                        <Menu.Menu position="right">
                            <Menu.Item position="right">
                                <Link to='/create-account'>
                                <Button size="tiny" basic inverted>
                                    Create account
                                </Button>
                                </Link>
                            </Menu.Item>
                            <Menu.Item position="right">
                                <Button size="tiny" basic inverted
                                    onClick={() => setModal('login-modal')}
                                    >
                                    Log in
                                </Button>
                            </Menu.Item>
                        </Menu.Menu>
                    ) : (
                        <>
                        <Menu.Menu position='left'>
                            <Menu.Item><p>Your scripts: </p></Menu.Item>
                            <Menu.Item>
                                <Dropdown
                                    search
                                    searchInput={{type: 'text'}}
                                    value={selectedScriptId}
                                    onChange={(e, data) => {
                                        uiState.setSelectedScriptId(data.value)
                                        // actions.selectScript(data.value)
                                    }}
                                    placeholder='Scripts'
                                    fluid
                                    selection
                                    options={scriptsForMenu} />
                            </Menu.Item>
                            {selectedScript && (
                                <Menu.Item style={{minWidth: 150}}>
                                    {selectedScript.updating ? (
                                        <Loader active />
                                    ) : selectedScript.updateError ? (
                                        <Message negative style={{padding: 3, width: '100%', paddingLeft: 9}}><Icon name='warning circle'/>Store error</Message>
                                    ) : selectedScript.updateSuccessful ? (
                                        <p>script synced <Icon name='checkmark'/></p>
                                    ) : (
                                        <p></p>
                                    )}
                                </Menu.Item>
                            )}
                            <Menu.Item>
                                <Button size="tiny" basic inverted onPointerDown={() => {
                                    // actions.scriptCreateResetParameters()
                                    setModal('new-script-modal')
                                }}>
                                    New script
                                </Button>
                            </Menu.Item>
                            
                        </Menu.Menu>
                        <Menu.Menu position='right'>
                            <Menu.Item>
                                <p className='account-name'>Signed in with <i>{user.email}</i></p>
                            </Menu.Item>
                            <Menu.Item position='right'>
                                <Link to='/account'>
                                    <Button size="tiny" basic inverted>
                                        Account
                                    </Button>
                                </Link>
                            </Menu.Item>
                            <Menu.Item position='right'>
                                <Button size="tiny" basic inverted onClick={() => {
                                    console.log('trigger log out action', user)
                                    user.actions.userLogOut()
                                }}>
                                    Sign out
                                </Button>
                            </Menu.Item>
                        </Menu.Menu>
                        </>
                    )}
                </Container>
            </Menu>
        </React.Fragment>
    )
}

export default MainMenu