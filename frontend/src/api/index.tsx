import axios from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

axiosClient.interceptors.request.use((config) => {
  const token = null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
