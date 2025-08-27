// src/services/yourApiCalls.js
import api from "./api";

export async function fetchSignals() {
  const { data } = await api.get("/signals");
  return data;
}

export async function fetchPulse() {
  const { data } = await api.get("/pulse");
  return data;
}
