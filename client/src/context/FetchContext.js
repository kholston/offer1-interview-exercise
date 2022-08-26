import React, { createContext } from "react";
import axios from "axios";

const FetchContext = createContext();
const { Provider } = FetchContext;

const FetchProvider = ({ children }) => {
  const mainAxios = axios.create({
    baseURL: "http://localhost:3001/api/v1",
    headers: {
      "Content-Type": "application/json",
    },
  });

  mainAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error.response?.data.error);
    }
  );

  return <Provider value={{ mainAxios }}>{children}</Provider>;
};

export { FetchContext, FetchProvider };
