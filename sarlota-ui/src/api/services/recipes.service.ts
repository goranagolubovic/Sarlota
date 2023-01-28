import { BACKEND_URL } from "../../util/constants";
import { get, post, put, remove } from "../client";

const URL = BACKEND_URL + "recepti";

const headers = { "Content-Type": "application/json" };

export interface Recipe {
  id: number;
  naslov: string;
  priprema: string;
  sastojci: string;
  fotografija: Blob;
}

export const fetchEmployees = async () => {
  const response = await get(URL);
  return response;
};

export const addRecipe = async (body: Recipe) => {
  const response = await post(URL, {
    headers,
    body: JSON.stringify(body),
  });
  return response;
};

export const deleteRecipe = async (id: number) => {
  const response = await remove(`${URL}/${id}`);
  return response;
};

export const editRecipe = async (id: number, body: Recipe) => {
  const response = await put(`${URL}/${id}`, {
    headers,
    body: JSON.stringify(body),
  });
  return response;
};

export const searchRecipes = async (query: string) => {
  const response = await get(`${URL}/search?query=${query}`);
  return response;
};
