import React from 'react'

const Filter = (props) => {
    return (
        <div>
            filter by name: <input onChange={props.handler} />
        </div>
    )
}

export default Filter
