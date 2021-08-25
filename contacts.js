const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const updateContacts = async (data) => {
  try {
    const contacts = JSON.stringify(data);
    await fs.writeFile(contactsPath, contacts);
  } catch (err) {
    throw err;
  }
};

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    throw err;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((item) => item.id === Number(contactId));
    if (!contact) {
      throw new Error(`There is no contact with id = ${contactId}`);
    }
    return contact;
  } catch (err) {
    throw err;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((contact) => contact.id === Number(contactId));
    if (idx === -1) {
      throw new Error(`There is no contact with ID=${contactId}`);
    }
    const newContactsArr = contacts.filter((item) => item.id !== contactId);
    await updateContacts(newContactsArr);
    return contacts[idx];
  } catch (err) {
    throw err;
  }
}

async function addContact(name, email, phone) {
  const newContact = { id: v4(), name, email, phone };
  try {
    const contacts = await listContacts();
    const newContactsArr = [...contacts, newContact];
    updateContacts(newContactsArr);
    return newContactsArr;
  } catch (err) {
    throw err;
  }
}

const contactsOperations = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

module.exports = contactsOperations;
