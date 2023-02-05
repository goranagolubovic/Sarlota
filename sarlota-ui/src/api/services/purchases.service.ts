import { BACKEND_URL } from "../../util/constants";
import { get } from "../client";

const URL = BACKEND_URL + "nabavke";

const headers = { "Content-Type": "application/json" };

export interface Nabavka {
  id: number;
  datum: Date;
  cijena: number;
  namirnice: Namirnice[];
}

export interface Namirnice {
  namirnica: Namirnica;
  cijena: number;
  kolicina: number;
}

export interface Namirnica {
  id: number;
  naziv: string;
  cijenaPoJedinici: number;
  jedinica: string;
}

export const fetchPurchases = async () => {
  const response = await get(URL, { headers });
  return response;
};
