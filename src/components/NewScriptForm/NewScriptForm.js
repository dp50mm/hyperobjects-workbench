import React, { useState, useContext } from 'react'
import {
    Input, Button, Form, Message
} from 'semantic-ui-react'
import { StoreContext } from 'store/store'
import _ from 'lodash'

const NewScriptForm = () => {
    const { state, actions } = useContext(StoreContext)
    const [newScriptName, setNewScriptName] = useState("")
    let newScript = _.find(state.user.scripts, p => _.get(p, 'new', false))
    return (
        <div className='new-script-form'>
            
            <h2>Create a new script</h2>
            {state.user.creatingScriptSuccessful ? (
                <Message positive>
                    Successfully created script: {newScript.name}
                </Message>
                
            ) : (
                <div className='ui form'>
                    <Form.Field>
                        <label>Script name</label>
                        <Input placeholder='name...' value={newScriptName} onChange={(e) => setNewScriptName(e.target.value)} />
                    </Form.Field>
                    <Button
                        onPointerDown={() => actions.scriptCreate(newScriptName)}
                        disabled={state.user.creatingScript}>
                        Create script
                    </Button>
                </div>
            )}
            
        </div>
    )
}

export default NewScriptForm