import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  const handleNameFilterInput = (e) => {
    setNameFilter(e.target.value);
  };

  const handleNameInput = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberInput = (e) => {
    setNewNumber(e.target.value);
  };

  const handleAddPerson = (e) => {
    e.preventDefault();
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      setNewNumber('')
      return null;
    }
    const newPersons = persons.concat(
      {
        name: newName,
        number: newNumber
      });
    setPersons(newPersons);
    setNewName('');
    setNewNumber('');
  };

  const personsToShow = () => {
    return persons.filter(person => (
      person.name.toLowerCase()
      .includes(nameFilter.toLowerCase())
      ));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onChange={handleNameFilterInput} value={nameFilter} />
      </div>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input onChange={handleNameInput} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberInput} value={newNumber} />
        </div>
        <div>
          <button onClick={handleAddPerson} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow().map(person => <p key={person.id}>{person.name} {person.number}</p>)}
    </div>
  );
};

export default App;