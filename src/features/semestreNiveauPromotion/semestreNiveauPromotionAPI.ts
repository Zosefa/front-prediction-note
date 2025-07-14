import axiosClient from "../../services/interceptor";
import type { createsemestreNiveauPromotion, semestreNiveauPromotionListResponse, semestreNiveauPromotionType, updatesemestreNiveauPromotion } from "./semestreNiveauPromotionType";

export const semestreNiveauPromotionSservice = {
  create: async (data: createsemestreNiveauPromotion): Promise<semestreNiveauPromotionType> => {
    const response = await axiosClient.post("/semestre-niveau-promotion", data);
    return response.data;
  },

  getAll: async (page = 1, size = 10, search = ''): Promise<semestreNiveauPromotionListResponse> => {
    const response = await axiosClient.get("/semestre-niveau-promotion", {
      params: { page, size, search }
    });
    return response.data;
  },

  getById: async (id: number): Promise<semestreNiveauPromotionType> => {
    const response = await axiosClient.get(`/semestre-niveau-promotion/${id}`);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/semestre-niveau-promotion/${id}`);
  },

  update: async (id: number, data: updatesemestreNiveauPromotion): Promise<semestreNiveauPromotionType> => {
    const response = await axiosClient.put(`/semestre-niveau-promotion/${id}`, data);
    return response.data;
  },
}