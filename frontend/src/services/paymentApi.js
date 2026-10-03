import api from "./api";

export const processPayment = (payload) =>
  api.post("/payments/process/", payload);
