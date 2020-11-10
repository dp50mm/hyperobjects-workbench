import React from 'react'
import {
    Container
} from 'semantic-ui-react'
import CreateAccountForm from 'components/CreateAccountForm'

const CreateAccountPage = () => {
    return (
        <div className='create-account-page'>
            <Container
                style={{paddingTop: 100}}
                >
                <CreateAccountForm />
            </Container>
        </div>
    )
}

export default CreateAccountPage