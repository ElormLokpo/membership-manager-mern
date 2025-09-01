import { store } from "@/redux";
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

axiosClient.interceptors.request.use((config) => {
  const {token} = store.getState().authReducer;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use((response) => response.data);
