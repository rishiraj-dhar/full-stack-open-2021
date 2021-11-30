import React from "react";

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

export default FilteredPersons;