import { BACKEND_URL } from "../../util/constants";
import { get, post, put, remove } from "../client";

const URL = BACKEND_URL + "narudzbe";

const headers = { "Content-Type": "application/json" };

export interface Orders {
  id: number;
  datumPrijema: string;
  datumIsporuke: string;
  slika: string;
  napomene: string;
  aktivna: boolean;
  imeNarucioca: string;
  kontakt: string;
  adresa: string;
  brojKomada: number;
  naziv: string;
}

export const fetchOrders = async () => {
  const response = await get(URL);
  return response;
};

export const addOrder = async (body: Orders) => {
  const response = await post(URL, {
    headers,
    body: JSON.stringify(body),
  });
  return response;
};

export const deleteOrder = async (id: number) => {
  const response = await remove(`${URL}/${id}`);
  return response;
};

export const editOrder = async (id: number, body: Orders) => {
  const response = await put(`${URL}/${id}`, {
    headers,
    body: JSON.stringify(body),
  });
  return response;
};

export const searchOrders = async (start: string, end?: string) => {
  let url = `${URL}/search?by=delivery&start=` + start;
  if (end !== undefined) {
    url += `&end=` + end;
  }
  const response = await get(url, {
    headers,
  });
  return response;
};

export const searchOrdersByPersonName = async (value: string) => {
  const response = await get(`${URL}/search/narucilac?query=` + value, {
    headers,
  });
  return response;
};
