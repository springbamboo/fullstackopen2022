import { React, useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '123456789' },
    ]);
    const [newPerson, setNewPerson] = useState({
        name: 'name',
        number: 'number',
    });

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
    return (
        <div>
            <h2>Phonebook</h2>
            <form>
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
                    {persons.map((ele) => (
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
