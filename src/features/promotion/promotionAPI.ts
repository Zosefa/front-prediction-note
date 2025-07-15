import axiosClient from "../../services/interceptor";
import type { createPromotion, PromotionListResponse, PromotionType, updatePromotion } from "./promotionType";

export const PromotionService = {
  create: async (data: createPromotion): Promise<PromotionType> => {
    const response = await axiosClient.post("/promotion", data);
    return response.data;
  },

  getAll: async (page = 1, size = 10, search = ''): Promise<PromotionListResponse> => {
    const response = await axiosClient.get("/promotion", {
      params: { page, size, search }
    });
    return response.data;
  },

  getById: async (id: number): Promise<PromotionType> => {
    const response = await axiosClient.get(`/promotion/${id}`);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/promotion/${id}`);
  },

  update: async (id: number, data: updatePromotion): Promise<PromotionType> => {
    const response = await axiosClient.put(`/promotion/${id}`, data);
    return response.data;
  },
}