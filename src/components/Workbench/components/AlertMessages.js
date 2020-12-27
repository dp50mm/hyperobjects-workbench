import React from 'react'
import _ from 'lodash'
import {
    Message
} from 'semantic-ui-react'

const AlertMessages = ({
    messages,
    width
}) => {
    let messageArray = _.keys(messages).map(key => messages[key]).filter(p => p)
    return (
        <div className='alert-messages' style={{width: width}}>
            {messageArray.map((message, i) => {
                return (
                    <Message
                        key={i}
                        warning
                        >
                        {message.text}
                    </Message>
                )
            })}
        </div>
    )
}

export default AlertMessages