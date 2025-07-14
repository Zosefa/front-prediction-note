import axiosClient from "../../services/interceptor";
import type { createPromotion, PromotionListResponse, PromotionType, updatePromotion } from "./promotionType";

export const PromotionSservice = {
  create: async (data: createPromotion): Promise<PromotionType> => {
    const response = await axiosClient.post("/promotions", data);
    return response.data;
  },

  getAll: async (page = 1, size = 10, search = ''): Promise<PromotionListResponse> => {
    const response = await axiosClient.get("/promotions", {
      params: { page, size, search }
    });
    return response.data;
  },

  getById: async (id: number): Promise<PromotionType> => {
    const response = await axiosClient.get(`/promotions/${id}`);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/promotions/${id}`);
  },

  update: async (id: number, data: updatePromotion): Promise<PromotionType> => {
    const response = await axiosClient.put(`/promotions/${id}`, data);
    return response.data;
  },
}