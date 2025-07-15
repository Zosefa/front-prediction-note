import axiosClient from "../../services/interceptor";
import type { createniveauPromotion, niveauPromotionListResponse, niveauPromotionType, updateniveauPromotion } from "./niveauPromotionType";

export const niveauPromotionService = {
  create: async (data: createniveauPromotion): Promise<niveauPromotionType> => {
    const response = await axiosClient.post("/niveauPromotions", data);
    return response.data;
  },

  getAll: async (page = 1, size = 10, search = ''): Promise<niveauPromotionListResponse> => {
    const response = await axiosClient.get("/niveauPromotions", {
      params: { page, size, search }
    });
    return response.data;
  },

  getById: async (id: number): Promise<niveauPromotionType> => {
    const response = await axiosClient.get(`/niveauPromotions/${id}`);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/niveauPromotions/${id}`);
  },

  update: async (id: number, data: updateniveauPromotion): Promise<niveauPromotionType> => {
    const response = await axiosClient.put(`/niveauPromotions/${id}`, data);
    return response.data;
  },
}