import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Phonebook from './components/Phonebook'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('add a person')
  const [ newNumber, setNewNumber ] = useState('555-5555555')
  const [ showAll, setShowAll ] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
        setShowAll(response)
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
        if(window.confirm(`${personObject.name} already has a number. Do you want to replace it?`)) {
            const personToUpdate = persons.find(p => p.name === personObject.name)
            const changedNum = { ...personToUpdate, number: personObject.number }

            personService
            .update(personToUpdate.id, changedNum)
            .then(response =>
              setPersons(persons.map(person => person.id !== personObject.id ? person : response)))
        }
    } else {
      personService.create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
        })
    }
    window.location.reload()
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

  const handleDel = (id) => {
    const personToDel = persons.find(p => p.id === id)
    
    if(window.confirm(`delete ${personToDel.name}`)) {
      personService
      .delPerson(id)
      .then(response => 
        setPersons(persons.map(person => person.id === id)))
      .catch(error => {
        alert(`there was an error deleting ${personToDel.name}`)
      })
    }
    window.location.reload()
  }

  return (
    <div>

      <h2>Phonebook</h2>

      <Filter handler={handleShow}/>
      
      <h2>add a new contact</h2>
      
      <Form addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      
      <h2>Numbers</h2>
      
      <ul>
        {showAll.map(person =>
          <Phonebook key={person.id} person={person} handleDel={() => handleDel(person.id)} />)}
      </ul>
    
    </div>
  )
}

export default App
