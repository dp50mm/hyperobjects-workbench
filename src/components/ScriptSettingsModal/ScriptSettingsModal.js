import { ScriptContext } from 'App'
import React, { useContext } from 'react'
import {
    Modal,
    Checkbox,
    Table,
    Form,
    Input
} from 'semantic-ui-react'
import _ from "lodash"
import dayjs from "dayjs"

let latestVersionStored = dayjs().clone().subtract(5, 'seconds')

const ScriptSettingsModal = ({uiState}) => {
    const scriptsContext = useContext(ScriptContext)
    const script = uiState.selectedScript

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
                <h3>Script: {script.name}</h3>
                <p>Updated at: {script.updatedAt}</p>
                <div className='ui form'>
                    <Form.Field>
                        <Checkbox
                            label="Module script"
                            checked={_.get(script, "isModule", false)}
                            onChange={() => {
                                var storeVersion = false
                                if (dayjs().diff(latestVersionStored, 'second') > 30) {
                                    storeVersion = true
                                    latestVersionStored = dayjs()
                                }
                                if(_.get(script, "isModule", false)) {
                                    scriptsContext.actions.updateScript({
                                        ...script,
                                        isModule: false,
                                        storeVersion: storeVersion
                                    })
                                } else {
                                    var moduleScript = _.get(script, "moduleScript", "// module script")
                                    scriptsContext.actions.updateScript({
                                        ...script,
                                        isModule: true,
                                        moduleScript: moduleScript,
                                        storeVersion: storeVersion
                                    })
                                }
                            }}
                            />
                    </Form.Field>
                    <Form.Field>
                    <Input
                        style={{width: "90%", marginBottom: 10}}
                        value={`https://workbench.hyperobjects.design/share/?script=${script._id}`}
                        label="Share url"
                        disabled={!_.get(script, 'public', false)}
                        />
                    <Checkbox
                        style={{marginLeft: 10}}
                        label="public"
                        checked={_.get(script, 'public', false)}
                        onChange={() => {
                            var storeVersion = false
                            if (dayjs().diff(latestVersionStored, 'second') > 30) {
                                storeVersion = true
                                latestVersionStored = dayjs()
                            }
                            scriptsContext.actions.updateScript({
                                ...script,
                                public: !_.get(script, "public", false),
                                storeVersion: true
                            })
                        }}
                        />
                    </Form.Field>
                </div>
                {window.location.host.includes("localhost:3000") && (
                    <div className='ui form'>
                        <Form.Field>
                        <Input
                            style={{width: "90%"}}
                            value={`http://localhost:3000/share/?script=${script._id}`}
                            label="Share url"
                            disabled={!_.get(script, 'public', false)}
                            />
                        </Form.Field>
                    </div>
                )}
            </Modal.Content>
        </Modal>
    )
}

export default ScriptSettingsModal