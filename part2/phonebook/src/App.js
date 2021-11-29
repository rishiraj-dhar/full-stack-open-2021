import React, { useState, useEffect } from 'react';
import NotificationCard from './components/NotificationCard';
import FilteredPersons from './components/FilteredPersons';
import TextInput from './components/TextInput';
import Button from './components/Button';
import Phonebook from './services/Phonebook';

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [notification, setNotification] = useState({ type: null, message: '' });

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
              setNotification({ type: 'success', message: `Updated contact details for ${responseData.name}` });
              setTimeout(() => {
                setNotification({ type: null, message: '' });
              }, 5000); // reset notification after 5 seconds
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
        setNotification({ type: 'success', message: `Added contact details of ${contactData.name}` });
        setTimeout(() => {
          setNotification({ type: null, message: '' });
        }, 5000); // reset notification after 5 seconds
        setNewName('');
        setNewNumber('');
      });
  };

  const handleDeletePerson = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      const newPersons = persons.filter(person => person.id !== personToDelete.id);
      setPersons(newPersons);
      Phonebook.deleteContact(personToDelete.id)
        .then(() => {
          setNotification({ type: 'success', message: `Deleted contact details for ${personToDelete.name}` });
          setTimeout(() => {
            setNotification({ type: null, message: '' });
          }, 5000); // reset notification after 5 seconds
        })
        .catch(() => {
          setNotification({ type: 'error', message: `Contact details for ${personToDelete.name} has already been removed from server!` });
          setTimeout(() => {
            setNotification({ type: null, message: '' });
          }, 5000); // reset notification after 5 seconds
        });
    };
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <NotificationCard notification={notification} />
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