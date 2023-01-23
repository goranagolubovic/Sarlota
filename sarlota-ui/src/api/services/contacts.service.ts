import { get, post } from "../client";

// Constants
import { BACKEND_URL } from "../../util/constants";

// Interfaces
import { Employee } from "./employee.service";

const headers = { "Content-Type": "application/json" };

export interface Contact {
  id: number;
  ime: string;
  prezime: string;
  brojTelefona: string;
  linkProfila: string;
  email: string;
}

export const fetchContacts = async () => {
  const response = await get(BACKEND_URL + "kontakti");
  return response;
};

export const addContact = async (body: Contact) => {
  console.log("add contact", body);
  const response = await post(BACKEND_URL + "kontakti", {
    headers,
    body: JSON.stringify(body),
  });
  return response;
};
