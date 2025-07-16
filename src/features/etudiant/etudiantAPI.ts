import type { createEtudiant, EtudiantListResponse, EtudiantType, updateEtudiant } from "./etudiantType";
import axiosClient from "../../services/interceptor";
import type { contactEtudiantType, createContactEtudiant } from "../contactEtudiant.ts/contactEtudiantType";

export const EtudiantService = {
  create: async (data: createEtudiant): Promise<EtudiantType> => {
    const response = await axiosClient.post("/etudiant", data, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    });
    return response.data;
  },
  
  createContact: async (data: createContactEtudiant): Promise<contactEtudiantType> => {
    const response = await axiosClient.post("etudiant/create-contact", data);
    return response.data;
  },

  getAll: async (page = 1, size = 10, search = ''): Promise<EtudiantListResponse> => {
    const response = await axiosClient.get("/etudiant", {
      params: { page, size, search }
    });
    return response.data;
  },

  getById: async (id: number): Promise<EtudiantType> => {
    const response = await axiosClient.get(`/etudiant/${id}`);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/etudiant/${id}`);
  },

  update: async (id: number, data: updateEtudiant): Promise<EtudiantType> => {
    const response = await axiosClient.put(`/etudiant/${id}`, data, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    });
    return response.data;
  },
};


export const ContactEtudiantService = {

};

