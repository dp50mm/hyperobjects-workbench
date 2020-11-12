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
import LoginForm from 'components/LoginForm'
import NewScriptForm from 'components/NewScriptForm'
import { StoreContext } from 'store/store'
import _ from 'lodash'
import './main-menu.scss'


const MainMenu = () => {
    const { state, actions } = useContext(StoreContext)
    const [ showModal, setShowModal ] = useState(false)
    const { user } = state

    let scriptsForMenu = []
    user.scripts.forEach(script => {
        scriptsForMenu.push({
            key: script.scriptId,
            value: script.scriptId,
            text: script.name
        })
    })
    let selectedScriptId = _.get(user, 'selectedScriptId', false)
    let selectedScript = false
    let selectedScriptvalue = false
    if(selectedScriptId) {
        selectedScript = _.find(user.scripts, p => p.scriptId === selectedScriptId)
        selectedScriptvalue = selectedScript.scriptId
    }
    // console.log(user.authenticated === false)
    return (
        <Menu inverted className='main-menu'>
            <Modal
                open={showModal === 'login-modal'}
                onClose={() => setShowModal(false)}
                closeIcon
                size="mini"
                >
                <Modal.Content>
                    <LoginForm />
                </Modal.Content>
            </Modal>
            <Modal
                open={showModal === 'new-script-modal'}
                onClose={() => setShowModal(false)}
                closeIcon
                size="mini"
                >
                <Modal.Content>
                    <NewScriptForm />
                </Modal.Content>
            </Modal>
            <Container fluid>
                <Link to="/">
                    <Menu.Item as='a' header>
                    Hyperobjects Workbench
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
                                onClick={() => setShowModal('login-modal')}
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
                                    actions.selectScript(data.value)
                                }}
                                placeholder='Scripts'
                                fluid
                                selection
                                options={scriptsForMenu} />
                        </Menu.Item>
                        {selectedScript && (
                            <Menu.Item style={{minWidth: 150}}>
                                {selectedScript.storing ? (
                                    <Loader active />
                                ) : selectedScript.storeError ? (
                                    <Message negative style={{padding: 3, width: '100%', paddingLeft: 9}}><Icon name='warning circle'/>Store error</Message>
                                ) : selectedScript.storeSuccessful ? (
                                    <p>script synced <Icon name='checkmark'/></p>
                                ) : (
                                    <p></p>
                                )}
                            </Menu.Item>
                        )}
                        <Menu.Item>
                            <Button size="tiny" basic inverted onPointerDown={() => {
                                actions.scriptCreateResetParameters()
                                setShowModal('new-script-modal')
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
                            <Button size="tiny" basic inverted onClick={() => actions.userLogOut()}>
                                Sign out
                            </Button>
                        </Menu.Item>
                    </Menu.Menu>
                    </>
                )}
            </Container>
        </Menu>
    )
}

export default MainMenu
