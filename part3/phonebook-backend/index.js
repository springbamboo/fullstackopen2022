const express = require('express');
const app = express();

let phonebook = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-123456',
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5323523',
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-234345',
    },
    {
        id: 4,
        name: 'Mary Poppendieck',
        number: '39-23-6423122',
    },
];

app.get('/api/persons', (request, response) => {
    response.json(phonebook);
});

app.get('/info', (request, response) => {
    response.send(
        `<h1>Phonebook has info for ${
            phonebook.length
        } people</h1> <h1>${new Date().toString()}</h1>`
    );
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = phonebook.find((person) => person.id === id);
    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    phonebook = phonebook.filter((e) => e.id !== id);
    if (phonebook) {
        response.json(phonebook);
    } else {
        response.status(204).end();
    }
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
