const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

morgan.token('body', (request, response) => {
    if(request.method === 'POST') {
        return JSON.stringify(request.body)
    } else {
        return ''
    }
})

let phoneBook = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-123456'
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5323523'
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-234345'
    },
    {
        id: 4,
        name: 'Mary Poppendick',
        number: '39-02-6423122'
    }
]

app.get('/api/persons', (request, response) => {
    response.json(phoneBook)
})

app.get('/info', (request, response) => {
    const datetime = new Date()
    const message = `<p>Phonebook has info for ${phoneBook.length} people</p>
    <p>${datetime}</p>`

    response.send(message)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const personToShow = phoneBook.find(person => person.id === Number(id))

    if(personToShow) {
        response.json(personToShow)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    phoneBook = phoneBook.filter(person => person.id !== Number(id))

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name || !body.number) {
        return response.status(400).json({"error": "name and number must be provided"})
    }

    const names = phoneBook.map(person => person.name)

    if(names.includes(body.name)) {
        return response.status(400).json({"error": "name already exists"})
    }

    const id = Math.floor(Math.random() * 1000)

    const person = {
        id: id,
        name: body.name,
        number: body.number
    }

    phoneBook = phoneBook.concat(person)
    
    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
