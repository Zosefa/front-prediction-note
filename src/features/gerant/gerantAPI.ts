import axiosClient from "../../services/interceptor";
import type { createGerant, GerantListResponse, GerantType, updateGerant } from "./gerantType";

export const GerantSservice = {
  create: async (data: createGerant): Promise<GerantType> => {
    const response = await axiosClient.post("/gerants", data);
    return response.data;
  },

  getAll: async (page = 1, size = 10, search = ''): Promise<GerantListResponse> => {
    const response = await axiosClient.get("/gerants", {
      params: { page, size, search }
    });
    return response.data;
  },

  getById: async (id: number): Promise<GerantType> => {
    const response = await axiosClient.get(`/gerants/${id}`);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/gerants/${id}`);
  },

  update: async (id: number, data: updateGerant): Promise<GerantType> => {
    const response = await axiosClient.put(`/gerants/${id}`, data);
    return response.data;
  },
}