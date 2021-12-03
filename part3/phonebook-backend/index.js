const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Contact = require('./models/contact');
const app = express();

app.use(cors());
app.use(express.json());

morgan.token('req-body', (req, res) => {
    if (req.method === 'POST'){
        return JSON.stringify(req.body);
    }
    return ' ';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));

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
      "number": "39-33-6423122"
    }
];

// generate Random ContactID

const generateContactID = () => {
    let generatedID;
    while (true) {
        generatedID = Math.floor(Math.random() * 10000);
        if (!persons.some(person => person.id === generatedID)) {
            break;
        }
    }
    return generatedID;
};

// get all contacts

app.get('/api/persons', (req, res) => {
    Contact.find({})
        .then(persons => res.json(persons));    
});

// get individual contact

app.get('/api/persons/:id', (req, res, next) => {
    Contact.findById(req.params.id)
        .then(requestedPerson => {
            if (requestedPerson) {
                res.json(requestedPerson);
            } else {
                res.status(404).json({ message: 'Contact not found!' });
            }
        })
        .catch(err => next(err));
});

// delete individual contact

app.delete('/api/persons/:id', (req, res, next) => {
    Contact.findByIdAndDelete(req.params.id)
        .then(result => {
            if (result) {          
                res.status(204).end();
            } else {
                res.status(404).json({message: 'Contact does not exist!'}); 
            };
        })
        .catch(err => next(err));
});

// add new contact

app.post('/api/persons', (req, res) => {
    
    // CHECK: name is missing
    if (!req.body.name) {
        return res.status(404).json({ message: "name is missing!" });
    }

    // CHECK: number is missing
    if (!req.body.number) {
        return res.status(404).json({ message: "number is missing!" });
    }

    // CHECK: name already exists
    // if (persons.some(person => person.name === newContact.name)) {
    //     return res.status(404).json({ message: "name already exists!" });
    // }

    const newContact = new Contact(req.body);
    newContact.save()
        .then(result => {
            res.json(result);
        });
});

app.get('/info', (req, res) => {
    const people = persons.length;
    const dateRightNow = new Date();
    res.send(
        `<p>Phonebook has info for ${people} ${(people === 1) ? 'person' : 'people'}</p>
        <p>${dateRightNow.toString()}</p>`
    );
});

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
    };
    next(err);
};

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});