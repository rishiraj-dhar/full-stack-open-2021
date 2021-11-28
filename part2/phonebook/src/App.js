import React, { useState } from 'react';

const TextInput = ({ labelText, value, handleInput }) => {
  return (
    <div>
        {labelText} <input onChange={handleInput} value={value} />
    </div>
  );
};

const Button = ({ handleClick, text }) => {
  return (
    <div>
      <button onClick={handleClick} type="submit">{text}</button>
    </div>
  );
};

const FilteredPersons = ({persons, nameFilter}) => {
  const personsToShow = persons.filter(person => (
      person.name.toLowerCase()
      .includes(nameFilter.toLowerCase())
      ));
  
  return (
    <>
      {personsToShow.map(
        person => (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        ))}
    </>
  );

};

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
        number: newNumber,
        id: persons.length + 1
      });
    setPersons(newPersons);
    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <TextInput labelText="filter shown with " handleInput={handleNameFilterInput} value={nameFilter} />
      <h2>add a new</h2>
      <form>
        <TextInput labelText="name: " value={newName} handleInput={handleNameInput} />
        <TextInput labelText="number: " value={newNumber} handleInput={handleNumberInput} />
        <Button handleClick={handleAddPerson} text="add" />
      </form>
      <h2>Numbers</h2>
      <FilteredPersons persons={persons} nameFilter={nameFilter} />
    </div>
  );
};

export default App;