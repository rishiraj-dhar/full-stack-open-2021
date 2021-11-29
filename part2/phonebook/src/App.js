import React, { useState, useEffect } from 'react';
import Phonebook from './services/Phonebook';

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

const FilteredPersons = ({persons, nameFilter, handleDeletePerson}) => {
  const personsToShow = persons.filter(person => (
      person.name.toLowerCase()
      .includes(nameFilter.toLowerCase())
      ));
  
  return (
    <>
      {personsToShow.map(
        person => (
          <p key={person.id}>
            {person.name} {person.number} <button onClick={() => { handleDeletePerson(person) }} >delete</button>
          </p>
        ))}
    </>
  );

};

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    Phonebook.readContacts()
      .then(contacts => setPersons(contacts));
  }, []);

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
      if (persons.some(person => person.number === newNumber)) {
        alert(`${newName} is already added to phonebook`);
      } else {
        const oldContact = persons.find(person => person.name === newName);
        if (window.confirm(`${newName} is already added to phonebook, replace the old number (${oldContact.number}) with the new number (${newNumber}) ?`)) {
          const updatedContact = { ...oldContact, number: newNumber };
          Phonebook.updateContact(updatedContact)
            .then(responseData => {
              setPersons(persons.map(person => (person.name === responseData.name) ? responseData : person));
            });
        }
      }
      setNewName('');
      setNewNumber('')
      return null;
    }
    
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons[persons.length - 1].id + 1
    }

    Phonebook.addContact(newPerson)
      .then(contactData => {
        const newPersons = persons.concat(contactData);
        setPersons(newPersons);
        setNewName('');
        setNewNumber('');
      });
  };

  const handleDeletePerson = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      Phonebook.deleteContact(personToDelete.id)
        .then(() => {
          const newPersons = persons.filter(person => person.id !== personToDelete.id);
          setPersons(newPersons);
        });
    };
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
      <FilteredPersons persons={persons} nameFilter={nameFilter} handleDeletePerson={handleDeletePerson} />
    </div>
  );
};

export default App;