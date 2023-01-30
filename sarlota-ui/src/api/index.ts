import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
  searchContacts,
} from "./services/contacts.service";
import {
  addEmployee,
  deleteEmployee,
  editEmployee,
  fetchEmployees,
  searchEmployees,
} from "./services/employee.service";
import {
  fetchRecipes,
  deleteRecipe,
  editRecipe,
  searchRecipes,
  addRecipe,
} from "./services/recipes.service";

import { login, signUp } from "./services/users.service";

export const api = {
  kontakti: {
    fetchContacts,
    addContact,
    deleteContact,
    editContact,
    searchContacts,
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
    searchEmployees,
  },
  recepti: {
    fetchRecipes,
    deleteRecipe,
    editRecipe,
    searchRecipes,
    addRecipe,
  },
};
