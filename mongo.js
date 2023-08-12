const mongoose = require('mongoose');

const password = process.argv[2];

const url = `mongodb+srv://fullstackopen:${password}@cluster0.bg5cb4w.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv[3] && process.argv[4]) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    });

    person.save().then((result) => {
        console.log(
            `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
        );
        mongoose.connection.close();
    });
} else {
    Person.find().then((result) => {
        console.log('phonebook:');
        result.forEach((person) => console.log(person.name, person.number));
        mongoose.connection.close();
    });
}