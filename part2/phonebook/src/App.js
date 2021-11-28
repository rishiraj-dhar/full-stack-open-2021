import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]); 
  const [newName, setNewName] = useState('');

  const handleNameInput = (e) => {
    setNewName(e.target.value);
  };

  const handleAddName = (e) => {
    e.preventDefault();
    const newPersons = persons.concat({ name: newName });
    setPersons(newPersons);
    setNewName('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleNameInput} value={newName} />
        </div>
        <div>
          <button onClick={handleAddName} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  );
};

export default App;