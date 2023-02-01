import { BACKEND_URL } from "../../util/constants";
import { get, post, put, remove } from "../client";

const URL = BACKEND_URL + "zaposleni";

const headers = { "Content-Type": "application/json" };

export interface Employee {
  id: number;
  ime: string;
  prezime: string;
  korisnickoIme?: string;
  plata: number;
  tipZaposlenog: string;
}

export const fetchEmployees = async () => {
  const response = await get(URL);
  return response;
};

export const addEmployee = async (body: Employee) => {
  const response = await post(URL, {
    headers,
    body: JSON.stringify(body),
  });
  return response;
};

export const deleteEmployee = async (id: number) => {
  const response = await remove(`${URL}/${id}`);
  return response;
};

export const editEmployee = async (id: number, body: Employee) => {
  delete body["korisnickoIme"];

  const response = await get("https://run.mocky.io/v3/e2e38e7a-f46c-43ed-a1ac-a9ed29f95fe1", {
    headers,
    // body: JSON.stringify(body),
  });
  return response;
};
