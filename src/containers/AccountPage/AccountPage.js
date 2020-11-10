import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import {
    Container
} from 'semantic-ui-react'
import './account-page.scss'
import { StoreContext } from 'store/store'

const AccountPage = () => {
    const { state } = useContext(StoreContext)
    const { user } = state
    if (user === false) {
        return (
            <Redirect to='/create-account' />
        )
    }
    return (
        <div className='account-page'>
            <Container>
                <h1>Your account</h1>
                <p>{user.email}</p>
            </Container>
        </div>
    )
}

export default AccountPage