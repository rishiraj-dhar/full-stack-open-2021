const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log("Please provide the password as an argument: node mongo.js <password>");
    process.exit(1);
};

if (process.argv.length === 4) {
    console.log("Name and number both must be specified!");
    process.exit(1);
};

if (process.argv.length > 5) {
    console.log("Too many arguments!");
    process.exit(1);
};

const password = process.argv[2];

const mongoURI = `${process.env.MONGO_DB_URI_PREFIX}${password}${process.env.MONGO_DB_URI_POSTFIX}`;

mongoose.connect(mongoURI);

const contactSchema = new mongoose.Schema({
    name: String,
    number: String
});

const Contact = mongoose.model('Contact', contactSchema);

if (process.argv.length === 3) {
    console.log("phonebook:");
    Contact.find({}).then(result => {
        result.forEach(contact => console.log(contact.name, contact.number));
        mongoose.connection.close();
    });
};

if (process.argv.length === 5) {
    const name = process.argv[3];
    const number = process.argv[4];
    const newContact = new Contact({
        name: name,
        number: number
    });
    newContact.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`);
        mongoose.connection.close();
    });
}