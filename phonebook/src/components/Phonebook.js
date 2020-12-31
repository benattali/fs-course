import React from 'react'

const Phonebook = ({ person, handleDel }) => {
    return (
        <div>
            {person.name} {person.number}
            <button onClick={handleDel}>delete</button>
        </div>
    )
}

export default Phonebook
