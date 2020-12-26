import React from 'react'

const Filter = (props) => {
    return (
        <div>
            find countries: <input onChange={props.handler} />
        </div>
    )
}

export default Filter
