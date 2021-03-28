import React, { useContext } from 'react'
import {
    Container,
    Button,
    Tab,
    Grid
} from 'semantic-ui-react'
import { UserContext } from '@dialectic-design/hyperobjects-user-context'
import "./account-page.scss"

import {
    Link
} from 'react-router-dom'
import ScriptsManager from 'components/ScriptsManager'

const AccountPage = () => {
    const user = useContext(UserContext)
    const panes = [
        {
            menuItem: "Scripts",
            render: () => <Tab.Pane><ScriptsManager /></Tab.Pane>
        },
        {
            menuItem: "Account",
            render: () => <Tab.Pane><p>Account</p></Tab.Pane>
        }
    ]
    return (
        <div className='account-page'>
            <Container style={{paddingTop: 100, paddingBottom: 100}}>
                {user.authenticated ? (
                    <React.Fragment>
                        <Grid columns={2}>
                            <Grid.Column
                                width={4}
                                >
                                <h1>Your account</h1>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                
                            </Grid.Column>
                        </Grid>
                        
                        <Tab panes={panes} menu={{vertical: true, fluid: true }} className='account-page-tabs' />
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                    <h1>Not signed in</h1>
                    <div>
                        <Link to='/create-account'>
                        <Button>
                            Create an account!
                        </Button>
                        </Link>
                    </div>
                    </React.Fragment>
                    
                )}
                
            </Container>
            
        </div>
    )
}

export default AccountPage