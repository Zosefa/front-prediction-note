import axiosClient from "../../services/interceptor";
import type { createExamen, ExamenListResponse, ExamenType, updateExamen } from "./examentType";

export const ExamenSservice = {
  create: async (data: createExamen): Promise<ExamenType> => {
    const response = await axiosClient.post("/examens", data);
    return response.data;
  },

  getAll: async (page = 1, size = 10, search = ''): Promise<ExamenListResponse> => {
    const response = await axiosClient.get("/examens", {
      params: { page, size, search }
    });
    return response.data;
  },

  getById: async (id: number): Promise<ExamenType> => {
    const response = await axiosClient.get(`/examens/${id}`);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/examens/${id}`);
  },

  update: async (id: number, data: updateExamen): Promise<ExamenType> => {
    const response = await axiosClient.put(`/examens/${id}`, data);
    return response.data;
  },
}