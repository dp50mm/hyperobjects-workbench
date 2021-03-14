import React, { useState, useEffect, useMemo } from 'react'
import _ from "lodash"
import Workbench from 'components/Workbench'

const SharePage = () => {
    const [loadingScript, setLoadingScript] = useState(false)
    const [script, setScript] = useState(false)
    const [loadingError, setLoadingError] = useState(false)
    
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)

    const scriptId = urlParams.get("script")

    useEffect(() => {
        if(!_.isNull(scriptId) && loadingScript === false && script === false) {
            setLoadingScript(true)
            var fetchUrl = false
            if(window.location.hostname.includes('localhost')) {
                fetchUrl = `http://localhost:5000/script/public/${scriptId}`
            } else {
                fetchUrl = `https://api.hyperobjects.design/script/public/${scriptId}`
            }
            fetch(fetchUrl)
                .then(resp => {
                    if(resp.status === 200) {
                        resp.json().then(script => {
                            document.title = _.get(script, 'name', "Hyperobjects script")
                            setScript(script)
                        })
                    } else {
                        console.log(resp)
                        setLoadingError(true)
                    }
                }).catch(err => {
                    console.log(err)
                    setLoadingError(true)
                })
        }
    }, [loadingScript, script, setLoadingScript])
    
    if(loadingError) {
        return (
            <p>Loading error</p>
        )
    }
    if(script === false) {
        return (
            <p>loading script</p>
        )
    }

    return (
        <div className='share-page'>
            <Workbench
                name={_.get(script, 'name', 'no script name')}
                script={script.script}
                scriptFromProp={true}
                autoRun={true}
                />
        </div>
    )
}

export default SharePage