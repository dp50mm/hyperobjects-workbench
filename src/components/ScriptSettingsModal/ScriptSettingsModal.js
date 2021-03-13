import React from 'react'
import {
    Modal
} from 'semantic-ui-react'

const ScriptSettingsModal = ({uiState}) => {
    console.log(uiState.mainPageModal)
    return (
        <Modal
            open={uiState.mainPageModal === "script-settings"}
            onClose={() => {
                console.log('modal on close')
                uiState.setMainPageModal(false)
            }}
            closeIcon
            >
            <Modal.Content>
                <h1>Script settings</h1>
            </Modal.Content>
        </Modal>
    )
}

export default ScriptSettingsModal