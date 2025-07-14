import axiosClient from "../../services/interceptor";
import type { createMatiere, MatiereListResponse, MatiereType, updateMatiere } from "./matiereType";

export const MatiereSservice = {
  create: async (data: createMatiere): Promise<MatiereType> => {
    const response = await axiosClient.post("/matieres", data);
    return response.data;
  },

  getAll: async (page = 1, size = 10, search = ''): Promise<MatiereListResponse> => {
    const response = await axiosClient.get("/matieres", {
      params: { page, size, search }
    });
    return response.data;
  },

  getById: async (id: number): Promise<MatiereType> => {
    const response = await axiosClient.get(`/matieres/${id}`);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/matieres/${id}`);
  },

  update: async (id: number, data: updateMatiere): Promise<MatiereType> => {
    const response = await axiosClient.put(`/matieres/${id}`, data);
    return response.data;
  },
}