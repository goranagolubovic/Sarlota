import { get } from "../client";

// Constants
import { BACKEND_URL } from "../../util/constants";

// Interfaces
import { Employee } from "./employee.service";

export interface Contact {
  id: number;
  ime: string;
  prezime: string;
  brojTelefona: string;
  linkProfila: string;
  email: string;
  zaposleniByZaposleniId: Employee;
}

export const fetchContacts = async () => {
  const response = await get(BACKEND_URL + "kontakti");
  return response;
};
