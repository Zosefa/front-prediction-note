import axiosClient from "../../services/interceptor";
import type { createniveauPromotionMatiere, niveauPromotionMatiereListResponse, niveauPromotionMatiereType, updateniveauPromotionMatiere } from "./niveauPromotionMatiereType";

export const niveauPromotionMatiereSservice = {
  create: async (data: createniveauPromotionMatiere): Promise<niveauPromotionMatiereType> => {
    const response = await axiosClient.post("/niveauPromotionMatieres", data);
    return response.data;
  },

  getAll: async (page = 1, size = 10, search = ''): Promise<niveauPromotionMatiereListResponse> => {
    const response = await axiosClient.get("/niveauPromotionMatieres", {
      params: { page, size, search }
    });
    return response.data;
  },

  getById: async (id: number): Promise<niveauPromotionMatiereType> => {
    const response = await axiosClient.get(`/niveauPromotionMatieres/${id}`);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/niveauPromotionMatieres/${id}`);
  },

  update: async (id: number, data: updateniveauPromotionMatiere): Promise<niveauPromotionMatiereType> => {
    const response = await axiosClient.put(`/niveauPromotionMatieres/${id}`, data);
    return response.data;
  },
}