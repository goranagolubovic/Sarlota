import { BACKEND_URL } from "../../util/constants";
import { get } from "../client";

const URL = BACKEND_URL + "statistika";

export const getNumOfOrders = async (numOfDays: string) => {
    const response = await get(URL + `/brojNarudzbi?query=${numOfDays}`);
    return response;
};

export const getTotalIncome = async (numOfDays: string) => {
    const response = await get(URL + `/ukupnaZarada?query=${numOfDays}`);
    return response;
};

export const getExpenditure = async (numOfDays: string) => {
    const response = await get(URL + `/potrosnja?query=${numOfDays}`);
    return response;
};

export const getIncome = async (numOfDays: string) => {
    const response = await get(URL + `/zarada?query=${numOfDays}`);
    return response;
};
