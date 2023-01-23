import {
  fetchContacts,
  addContact,
  deleteContact,
} from "./services/contacts.service";

export const api = {
  kontakti: {
    fetchContacts,
    addContact,
    deleteContact,
  },
};
