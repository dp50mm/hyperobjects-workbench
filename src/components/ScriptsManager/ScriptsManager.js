import {
    EntityList
} from '@dialectic-design/hyperobjects-entity-context'
import { ScriptContext } from 'App'

const ScriptsManager = () => {
    return (
        <div className="scripts-manager">
            <EntityList context={ScriptContext} />
        </div>
    )
}

export default ScriptsManager