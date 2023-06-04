const express = require('express');
const cors = require('cors');

const app = express();
// app.use(express.static('build'));
app.use(cors());
app.use(express.json());

const Note = require('./models/note');

app.get('/api/notes', (req, res) => {
    Note.find({}).then((notes) => {
        res.json(notes);
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
