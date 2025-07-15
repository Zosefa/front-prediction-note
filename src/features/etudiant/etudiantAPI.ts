import type { createEtudiant, EtudiantListResponse, EtudiantType, updateEtudiant } from "./etudiantType";
import axiosClient from "../../services/interceptor";

export const EtudiantService = {
  create: async (data: createEtudiant): Promise<EtudiantType> => {
    const response = await axiosClient.post("/etudiants", data);
    return response.data;
  },

  getAll: async (page = 1, size = 10, search = ''): Promise<EtudiantListResponse> => {
    const response = await axiosClient.get("/etudiants", {
      params: { page, size, search }
    });
    return response.data;
  },

  getById: async (id: number): Promise<EtudiantType> => {
    const response = await axiosClient.get(`/etudiants/${id}`);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/etudiants/${id}`);
  },

  update: async (id: number, data: updateEtudiant): Promise<EtudiantType> => {
    const response = await axiosClient.put(`/etudiants/${id}`, data);
    return response.data;
  },
};


