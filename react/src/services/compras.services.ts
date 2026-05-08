import { Cart } from "../pages/carrito-page/CarritoPage";
import { API_BASE_URL } from "./api";

async function confirmar(compra: Cart, userId: string) {
  return fetch(`${API_BASE_URL}/api/compras/confirmar/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ compra, userId }),
  }).then((response) =>
    response.json().then((data) => {
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    })
  );
}

async function getAllByUser(userId: string) {
  return fetch(`${API_BASE_URL}/api/compras/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

export { confirmar, getAllByUser };
