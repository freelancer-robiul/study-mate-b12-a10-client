export const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:3000";

const parse = async (res) => {
  let data = null;
  try {
    data = await res.json();
  } catch {}
  if (!res.ok) {
    const msg =
      data?.message || data?.detail || `${res.status} ${res.statusText}`;
    throw new Error(msg);
  }
  return data;
};

export const getJson = (url) => fetch(url, { method: "GET" }).then(parse);

export const postJson = (url, body) =>
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then(parse);

export const patchJson = (url, body) =>
  fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then(parse);

export const delJson = (url) => fetch(url, { method: "DELETE" }).then(parse);
