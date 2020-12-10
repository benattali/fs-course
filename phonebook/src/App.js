import React, { useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Phonebook from './components/Phonebook'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' , id: 1},
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [ newName, setNewName ] = useState('add a person')
  const [ newNumber, setNewNumber ] = useState('555-5555555')
  const [ showAll, setShowAll ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
        name: newName,
        id: persons.length + 1,
        number: newNumber
    }
    const names = persons.map(person => person.name)
    if (names.includes(personObject.name)) {
        window.alert(`${personObject.name} is already in the phonebook`);
    } else {
        setPersons(persons.concat(personObject))
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleShow = (event) => {
    const show = persons.filter(person => {
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
      if (person.name.toLowerCase().includes(event.target.value.toLowerCase())) {
        return person
      }
      return ''
    })
    setShowAll(show)
  }

  return (
    <div>

      <h2>Phonebook</h2>

      <Filter handler={handleShow}/>
      
      <h2>add a new contact</h2>
      
      <Form addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      
      <h2>Numbers</h2>
      
      <Phonebook showAll={showAll} persons={persons}/>
    
    </div>
  )
}

export default App
