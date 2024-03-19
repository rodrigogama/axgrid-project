import { AxiosRequestConfig } from "axios";
import apiInstance from "./config";

class API {
  async get<T>(url: string, config?: AxiosRequestConfig) {
    return await apiInstance.get<T>(url, config);
  }

  async post<T>(url: string, data: any, config?: AxiosRequestConfig) {
    return await apiInstance.post<T>(url, data, config);
  }

  // other http methods can be implemented when needed. Eg: put, delete...
}

export const api = new API();
