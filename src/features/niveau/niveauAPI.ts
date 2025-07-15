import axiosClient from "../../services/interceptor";
import type { createNiveau, NiveauListResponse, NiveauType, updateNiveau } from "./niveauType";

export const NiveauSservice = {
  create: async (data: createNiveau): Promise<NiveauType> => {
    const response = await axiosClient.post("/niveau", data);
    return response.data;
  },

  getAll: async (page = 1, size = 10, search = ''): Promise<NiveauListResponse> => {
    const response = await axiosClient.get("/niveau", {
      params: { page, size, search }
    });
    return response.data;
  },

  getById: async (id: number): Promise<NiveauType> => {
    const response = await axiosClient.get(`/niveau/${id}`);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/niveau/${id}`);
  },

  update: async (id: number, data: updateNiveau): Promise<NiveauType> => {
    const response = await axiosClient.put(`/niveau/${id}`, data);
    return response.data;
  },
}