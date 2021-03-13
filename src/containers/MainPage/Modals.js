import React from 'react'
import ScriptSettingsModal from 'components/ScriptSettingsModal'
import ScriptsModal from 'components/ScriptsModal'

/**
 * Modals for main page
 */
const Modals = ({
    uiState
}) => {
    return (
        <React.Fragment>
            <ScriptSettingsModal uiState={uiState} />
            <ScriptsModal uiState={uiState} />
        </React.Fragment>
    )
}

export default Modals