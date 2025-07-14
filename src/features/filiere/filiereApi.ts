import axiosClient from "../../services/interceptor";
import type { createFiliere, FiliereListResponse, FiliereType, updateFiliere } from "./filiereType";

export const FiliereService = {
  create: async (data: createFiliere): Promise<FiliereType> => {
    const response = await axiosClient.post("/filiere", data);
    return response.data;
  },

  getAll: async (page = 1, size = 10, search = ''): Promise<FiliereListResponse> => {
    const response = await axiosClient.get("/filiere", {
      params: { page, size, search }
    });
    return response.data;
  },

  getById: async (id: number): Promise<FiliereType> => {
    const response = await axiosClient.get(`/filiere/${id}`);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/filiere/${id}`);
  },

  update: async (id: number, data: updateFiliere): Promise<FiliereType> => {
    const response = await axiosClient.put(`/filiere/${id}`, data);
    return response.data;
  },
}