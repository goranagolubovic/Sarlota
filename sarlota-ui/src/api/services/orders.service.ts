import internal from "stream";
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
    // delete body["korisnickoIme"];

    const response = await put(`${URL}/${id}`, {
        headers,
        body: JSON.stringify(body),
    });
    return response;
};
