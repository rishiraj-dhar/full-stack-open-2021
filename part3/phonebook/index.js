const express = require('express');
const app = express();

const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
    const personID = Number(req.params.id);
    const requestedPerson = persons.find(person => person.id === personID);

    if (requestedPerson) {
        res.json(requestedPerson);
    } else {
        res.status(404).json({ message: 'Person not found!' });
    }
});

app.get('/info', (req, res) => {
    const people = persons.length;
    const dateRightNow = new Date();
    res.send(
        `<p>Phonebook has info for ${people} ${(people === 1) ? 'person' : 'people'}</p>
        <p>${dateRightNow.toString()}</p>`
    );
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});