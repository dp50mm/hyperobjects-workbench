import React, { useState, useContext } from 'react'
import {
    Link
} from 'react-router-dom'
import {
    Input, Button, Form, Message
} from 'semantic-ui-react'
import { StoreContext } from 'store/store'
import _ from 'lodash'

const CreateAccountForm = () => {
    const { state, actions } = useContext(StoreContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    if(state.user.authenticated) {
        if(_.get(state.user, 'accountCreationSuccessful', false)) {
            return (
                <div className='already-logged-in'>
                    <Message positive>
                    <p>You have successfuly created an account. Check your email for confirmation!
                    </p>
                    </Message>
                    <Link to='/'>
                    <Button>
                        Start creating
                    </Button>
                    </Link>
                </div>
            )
        }
        return (
            <div className='already-logged-in'>
                <p>You are already logged in, sign out before creating a new account.
                </p>
                <Button onClick={() => actions.userLogOut()}>
                    Log out
                </Button>
            </div>
        )
    }
    return (
        <div className='create-account-form'>
            <h2>Create an account</h2>
            {state.user.signingUp ? (
                <p>Creating an account</p>
            ) : (
                <div class='ui form'>
                <Form.Field>
                    <label>email</label>
                    <Input placeholder='e-mail...' value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>password</label>
                    <Input type='password' placeholder='password...' value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Field>
                {state.user.signUpError && (
                    <Message negative>
                    <p className='sign-up-error'>{state.user.signUpError}</p>
                    </Message>
                )}
                <Button onClick={() => actions.userSignUp({
                    email,
                    password
                })}>
                    Sign up
                </Button>
                </div>
            )}
            
        </div>
    )
}

export default CreateAccountForm