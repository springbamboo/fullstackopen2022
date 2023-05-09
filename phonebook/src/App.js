import { React, useState, useEffect } from 'react';
import phonebook from './services/phonebook';

const Notification = ({ message }) => {
    return <h3 className="message">{message}</h3>;
};

const Filter = ({ setNewFilter, persons, setFilterPerson }) => {
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
            {' '}
            filter shown with
            <input onChange={handleFilterChange} />
        </div>
    );
};

const PersonForm = ({
    newPerson,
    setNewPerson,
    setPersons,
    persons,
    setMessage,
}) => {
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
        const temp = persons.filter((p) => p.name === newPerson.name);
        if (persons.filter((p) => p.name === newPerson.name).length) {
            const check = window.confirm(
                `${newPerson.name} is aleady added to phonebook, replace the old number with a new one?`
            );
            if (check) {
                phonebook
                    .updateOne(temp[0].id, newPerson)
                    .then((response) => {
                        setPersons(
                            persons.map((p) =>
                                p.name !== newPerson.name ? p : response
                            )
                        );
                    })
                    .catch((e) => {
                        setMessage(
                            `${newPerson.name} has been already benn removed from server`
                        );
                    });
                setMessage(`Changed ${newPerson.name}`);
                setTimeout(() => {
                    setMessage(null);
                }, 5000);
            }
        } else {
            phonebook.create(newPerson).then((response) => {
                setPersons(persons.concat(response));
                setMessage(`Added ${newPerson.name}`);
                setTimeout(() => {
                    setMessage(null);
                }, 5000);
            });
        }
    };
    return (
        <div>
            {' '}
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
        </div>
    );
};

const Persons = ({
    newFilter,
    filterPerson,
    persons,
    setPersons,
    setMessage,
}) => {
    const handleDelete = (ele) => {
        const check = window.confirm(`Delete ${ele.name}?`);
        if (check) {
            phonebook.deleteOne(ele.id);
            setPersons(persons.filter((e) => e.id !== ele.id));
            setMessage(`Deleted ${ele.name}`);
            setTimeout(() => {
                setMessage(null);
            }, 5000);
        }
    };
    return (
        <div>
            {' '}
            <h2>Numbers</h2>
            <div>
                <ul>
                    {newFilter === ''
                        ? persons.map((ele) => (
                              <li key={ele.name}>
                                  {ele.name} {ele.number}
                                  <button onClick={() => handleDelete(ele)}>
                                      delete
                                  </button>
                              </li>
                          ))
                        : filterPerson.map((ele) => (
                              <li key={ele.name}>
                                  {ele.name} {ele.number}
                                  <button onClick={() => handleDelete(ele)}>
                                      delete
                                  </button>
                              </li>
                          ))}
                </ul>
            </div>
        </div>
    );
};

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newPerson, setNewPerson] = useState({
        name: '',
        number: '',
    });
    const [newFilter, setNewFilter] = useState('');
    const [filterPerson, setFilterPerson] = useState(persons);

    const [message, setMessage] = useState(null);

    useEffect(() => {
        phonebook.getAll().then((response) => {
            setPersons(response);
        });
    }, []);

    return (
        <div>
            <h1>Phonebook</h1>
            {message === null ? (
                <div></div>
            ) : (
                <Notification message={message} />
            )}{' '}
            <Filter
                setNewFilter={setNewFilter}
                persons={persons}
                setFilterPerson={setFilterPerson}
            />
            <PersonForm
                newPerson={newPerson}
                setNewPerson={setNewPerson}
                setPersons={setPersons}
                persons={persons}
                setMessage={setMessage}
            />
            <Persons
                newFilter={newFilter}
                filterPerson={filterPerson}
                persons={persons}
                setPersons={setPersons}
                setMessage={setMessage}
            />
        </div>
    );
};

export default App;
