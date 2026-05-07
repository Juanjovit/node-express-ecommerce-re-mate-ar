const API_BASE_URL = (
  import.meta.env.VITE_API_URL ?? "http://localhost:2022"
).replace(/\/+$/, "");

export { API_BASE_URL };
