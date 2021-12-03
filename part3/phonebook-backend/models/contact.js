const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_DB_URI;

mongoose.connect(mongoURI);

const contactSchema = new mongoose.Schema({
    name: String,
    number: String
});

contactSchema.set('toJSON', {
    transform: (document, result) => {
        result.id = result._id.toString();
        delete result._id;
        delete result.__v;
    }
});

module.exports = mongoose.model('Contact', contactSchema);