const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./model/person');
const app = express();

app.use(express.static('build'));
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

app.get('/api/persons', (request, response) => {
    Person.find({}).then((person) => {
        response.json(person);
    });
});

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then((person) => {
        if (person) {
            response.json(person);
        } else {
            response.status(404).end();
        }
    });
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

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    person.save().then((person) => {
        response.json(person);
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);