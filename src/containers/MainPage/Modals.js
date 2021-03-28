import React from 'react'
import ScriptSettingsModal from 'components/ScriptSettingsModal'

/**
 * Modals for main page
 */
const Modals = ({
    uiState
}) => {
    return (
        <React.Fragment>
            <ScriptSettingsModal uiState={uiState} />
        </React.Fragment>
    )
}

export default Modals