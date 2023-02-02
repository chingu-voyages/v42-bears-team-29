import axois from "axios";

const instance = axois.create({
  baseURL: import.meta.env.VITE_SERVER,
});

export const loginAPI = (credentials) =>
  instance.post("/auth/login", credentials);

export const signupAPI = (credentials) =>
  instance.post("/auth/signup", credentials);

export const auth0API = (credentials) =>
  instance.post("/auth/auth0", credentials);
