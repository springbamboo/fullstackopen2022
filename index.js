const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./model/person');
const app = express();

app.use(cors());
app.use(express.static('build'));

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

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then((person) => {
            if (person) {
                response.json(person);
            } else {
                response.status(404).end();
            }
        })
        .catch((error) => {
            next(error);
        });
});

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then((result) => {
            response.status(204).end();
        })
        .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;

    const person = {
        name: body.name,
        number: body.number,
    };

    Person.findByIdAndUpdate(request.params.id, person)
        .then((updatedNote) => {
            response.json(updatedNote);
        })
        .catch((error) => next(error));
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

const errorHandler = (error, request, response, next) => {
    console.error(error.message);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }
    next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);