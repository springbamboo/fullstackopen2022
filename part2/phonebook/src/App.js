import { React, useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
    ]);
    const [newPerson, setNewPerson] = useState({
        name: 'name',
        number: 'number',
    });

    const [newFilter, setNewFilter] = useState('');
    const [filterPerson, setFilterPerson] = useState(persons);

    const handleInputNameChange = (e) => {
        const changedNewPerson = { ...newPerson, name: e.target.value };
        setNewPerson(changedNewPerson);
    };

    const handleInputNumberChange = (e) => {
        const changedNewPerson = { ...newPerson, number: e.target.value };
        setNewPerson(changedNewPerson);
    };

    const handleButtonClick = (e) => {
        e.preventDefault();
        setPersons(persons.concat(newPerson));
    };

    const handleFilterChange = (e) => {
        setNewFilter(e.target.value);
        const a = persons.filter(
            (ele) =>
                ele.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
                -1
        );
        setFilterPerson(a);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            filter shown with
            <input onChange={handleFilterChange} />
            <form>
                <h2>add a new</h2>
                <div>
                    name:{' '}
                    <input
                        value={newPerson.name}
                        onChange={handleInputNameChange}
                    />
                </div>
                <div>
                    number:{' '}
                    <input
                        value={newPerson.number}
                        onChange={handleInputNumberChange}
                    />
                </div>
                <div>
                    <button type="submit" onClick={handleButtonClick}>
                        add
                    </button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                <ul>
                    {newFilter === ''
                        ? persons.map((ele) => (
                              <li key={ele.name}>
                                  {ele.name} {ele.number}
                              </li>
                          ))
                        : filterPerson.map((ele) => (
                              <li key={ele.name}>
                                  {ele.name} {ele.number}
                              </li>
                          ))}
                </ul>
            </div>
        </div>
    );
};

export default App;
