import axios from 'axios';

const baseURL = 'http://localhost:3001/persons';

const readContacts = async () => {
    const response = await axios.get(baseURL);
    return response.data;
};

const addContact = async (contact) => {
    const response = await axios.post(baseURL, contact);
    return response.data;
};

export default { readContacts, addContact };