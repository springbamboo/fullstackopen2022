import { React, useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
    const [newName, setNewName] = useState('new name');

    const handleInputNameChange = (e) => {
        // console.log(e.target.value);
        setNewName(e.target.value);
    };

    const handleButtonClick = (e) => {
        e.preventDefault();
        const person = persons.filter((ele) => {
            return ele.name === newName;
        });
        if (person.length > 0) {
            // console.log(person);
            alert(`${person[0].name} is already added to phonebook`);
        } else {
            setPersons(persons.concat({ name: newName }));
        }
    };
    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    name:{' '}
                    <input value={newName} onChange={handleInputNameChange} />
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
                        <li key={ele.name}>{ele.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;
