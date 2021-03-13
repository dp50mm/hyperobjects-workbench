import React, { useContext } from 'react'
import {
    Modal
} from 'semantic-ui-react'
import {
    ScriptContext
} from 'App'


const ScriptsModal = ({ uiState }) => {
    const scriptsContext = useContext(ScriptContext)
    return (
        <Modal
            open={uiState.mainPageModal === "your-scripts"}
            onClose={() => {
                console.log('modal on close')
                uiState.setMainPageModal(false)
            }}
            closeIcon
            >
            <Modal.Content>
                <h1>Your scripts</h1>
            </Modal.Content>
        </Modal>
    )
}

export default ScriptsModal