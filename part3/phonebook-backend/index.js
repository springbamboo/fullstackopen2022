const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(cors());

morgan.token('body', function getId(req) {
    return JSON.stringify(req.body);
});

app.use(express.json());
app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :body'
    )
);

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

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body) {
        return response.status(400).json({
            error: 'content missing',
        });
    }

    if (!body.name) {
        return response.status(400).json({
            error: 'missing name',
        });
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'missing number',
        });
    }

    if (phonebook.find((person) => person.name == body.name)) {
        return response.status(400).json({ error: 'name must be unique' });
    }

    const person = {
        id: Math.floor(Math.random() * 10000),
        name: body.name,
        number: body.number,
    };

    phonebook = phonebook.concat(person);
    response.json(phonebook);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
