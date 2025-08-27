// src/services/api.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

const instance = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
// Named exports for API calls
export async function fetchSignals() {
  const { data } = await instance.get("/signals");
  return data;
}

export async function fetchPulse() {
  const { data } = await instance.get("/pulse");
  return data;
}
export default instance;
