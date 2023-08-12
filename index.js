require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Note = require('./models/note');

const app = express();

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method);
    console.log('Path:  ', request.path);
    console.log('Body:  ', request.body);
    console.log('---');
    next();
};

const errorHandler = (error, request, response, next) => {
    console.error(error);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }
    next(error);
};

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

app.use(cors());
app.use(express.json());
app.use(requestLogger);
// app.use(express.static('build'));

app.get('/api/notes', (req, res) => {
    Note.find({}).then((notes) => {
        res.json(notes);
    });
});

app.get('/api/notes/:id', (req, res) => {
    Note.findById(req.params.id)
        .then((note) => {
            if (note) {
                res.json(note);
            } else {
                res.status(404).end();
            }
        })
        .catch((error) => next(error));
});

app.post('/api/notes', (req, res) => {
    const body = req.body;

    if (body.content === undefined) {
        return res.status(400).json({ error: 'content missing' });
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    });

    note.save().then((savedNote) => {
        res.json(savedNote);
    });
});

app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
        .then((result) => {
            response.status(204).end();
        })
        .catch((error) => next(error));
});

app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body;

    const note = {
        content: body.content,
        important: body.important,
    };

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then((updatedNote) => {
            response.json(updatedNote);
        })
        .catch((error) => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
