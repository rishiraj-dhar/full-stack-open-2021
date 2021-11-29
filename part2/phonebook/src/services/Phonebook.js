import axios from 'axios';

const baseURL = 'http://localhost:3001/persons';

const readContacts = async () => {
    const response = await axios.get(baseURL);
    return response.data;
};

const addContact = async (newContact) => {
    const response = await axios.post(baseURL, newContact);
    return response.data;
};

const updateContact = async (updatedContact) => {
    const response = await axios.put(`${baseURL}/${updatedContact.id}`, updatedContact);
    return response.data;
};

const deleteContact = async (contactID) => {
    const response = await axios.delete(`${baseURL}/${contactID}`);
    return response.data;
};

const Phonebook = { readContacts, addContact, updateContact, deleteContact };

export default Phonebook;