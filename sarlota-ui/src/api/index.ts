import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
} from "./services/contacts.service";

export const api = {
  kontakti: {
    fetchContacts,
    addContact,
    deleteContact,
    editContact,
  },
};
