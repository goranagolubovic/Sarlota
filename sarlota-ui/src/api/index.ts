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
  updateEmployee,
} from "./services/employee.service";
import {
  fetchOrders,
  editOrder,
  addOrder,
  deleteOrder,
  searchOrders,
  searchOrdersByPersonName,
} from "./services/orders.service";
import {
  fetchPurchases,
  addFoodStuff,
  fetchIngredients,
} from "./services/purchases.service";
import {
  fetchRecipes,
  fetchRecipe,
  deleteRecipe,
  editRecipe,
  searchRecipes,
  addRecipe,
  toggleFavorite,
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
    updateEmployee,
  },
  recepti: {
    fetchRecipes,
    fetchRecipe,
    deleteRecipe,
    editRecipe,
    searchRecipes,
    addRecipe,
    toggleFavorite,
  },
  narudzbe: {
    fetchOrders,
    editOrder,
    addOrder,
    deleteOrder,
    searchOrders,
    searchOrdersByPersonName,
  },
  nabavke: {
    fetchPurchases,
    addFoodStuff,
    fetchIngredients,
  },
};
