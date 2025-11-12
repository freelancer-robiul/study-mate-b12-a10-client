import axios from "axios";

export const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.detail ||
      err?.message ||
      "Request failed";
    return Promise.reject(new Error(msg));
  }
);

export const getJson = (url, config = {}) =>
  api.get(url, config).then((r) => r.data);
export const postJson = (url, body, config = {}) =>
  api.post(url, body, config).then((r) => r.data);
export const patchJson = (url, body, config = {}) =>
  api.patch(url, body, config).then((r) => r.data);
export const delJson = (url, config = {}) =>
  api.delete(url, config).then((r) => r.data);
