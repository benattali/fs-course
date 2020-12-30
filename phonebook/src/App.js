import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Phonebook from './components/Phonebook'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('add a person')
  const [ newNumber, setNewNumber ] = useState('555-5555555')
  const [ showAll, setShowAll ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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
        axios.post('http://localhost:3001/persons', personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
        })
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
