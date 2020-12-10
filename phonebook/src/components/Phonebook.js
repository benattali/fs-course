import React from 'react'

const Phonebook = (props) => {
    return (
        <div>
            {props.showAll
            ? props.showAll.map(person =>
            <p key={person.id}>{person.name} {person.number}</p>
            )
            : props.persons.map(person => 
            <p key={person.id}>{person.name} {person.number}</p>
            )}
        </div>
    )
}

export default Phonebook
