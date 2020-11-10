import React, { useContext, useState } from 'react'
import {
    Input, Button, Form, Message
} from 'semantic-ui-react'
import { StoreContext } from 'store/store'
import _ from 'lodash'

const LoginForm = () => {
    const { state, actions } = useContext(StoreContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className='login-form'>
            {state.user.authenticated ? (
               <>
               <h3>Signed in!</h3>
                <p>Sucessfully signed in with the following email address: {state.user.email}</p>
               </>
           ) : (
                <>
                <h3>Sign in</h3>
                {state.user.authenticating ? (
                    <p>Authenticating</p>
                ) : (
                    <div className='ui form'>
                        <Form.Field>
                            <label>email</label>
                        <Input placeholder='e-mail...' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Field>
                        <Form.Field>
                            <label>password</label>
                            <Input type='password' placeholder='password...' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Field>
                        <Button onClick={() => actions.userLogIn({email: email, password: password})}>Sign in</Button>
                        {state.user.authenticationError ? (
                            <Message negative>
                            <p className='login-error'>{state.user.authenticationError}</p>
                            </Message>
                        ) : null}
                    </div>
                )}
                </>
           )}
        </div>
    )
}

export default LoginForm