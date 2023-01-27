import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
} from "./services/contacts.service";
import {
  addEmployee,
  deleteEmployee,
  editEmployee,
  fetchEmployees,
} from "./services/employee.service";

import { login, signUp } from "./services/users.service";

export const api = {
  kontakti: {
    fetchContacts,
    addContact,
    deleteContact,
    editContact,
  },
  login: {
    login,
    signUp,
  },
  zaposleni: {
    fetchEmployees,
    addEmployee,
    deleteEmployee,
    editEmployee,
  },
};
