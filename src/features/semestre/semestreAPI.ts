import axiosClient from "../../services/interceptor";
import type { createSemestre, SemestreListResponse, SemestreType, updateSemestre } from "./semestreType";

export const SemestreSservice = {
  create: async (data: createSemestre): Promise<SemestreType> => {
    const response = await axiosClient.post("/semestres", data);
    return response.data;
  },

  getAll: async (page = 1, size = 10, search = ''): Promise<SemestreListResponse> => {
    const response = await axiosClient.get("/semestres", {
      params: { page, size, search }
    });
    return response.data;
  },

  getById: async (id: number): Promise<SemestreType> => {
    const response = await axiosClient.get(`/semestres/${id}`);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/semestres/${id}`);
  },

  update: async (id: number, data: updateSemestre): Promise<SemestreType> => {
    const response = await axiosClient.put(`/semestres/${id}`, data);
    return response.data;
  },
}