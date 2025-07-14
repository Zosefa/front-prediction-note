import axiosClient from "../../services/interceptor";
import type { createNoteExamen, NoteExamenListResponse, NoteExamenType, updateNoteExamen } from "./NoteExamenType";

export const NoteExamenService = {
  create: async (data: createNoteExamen): Promise<NoteExamenType> => {
    const response = await axiosClient.post("/note-examen", data);
    return response.data;
  },

  getAll: async (page = 1, size = 10, search = ''): Promise<NoteExamenListResponse> => {
    const response = await axiosClient.get("/note-examen", {
      params: { page, size, search }
    });
    return response.data;
  },

  getById: async (id: number): Promise<NoteExamenType> => {
    const response = await axiosClient.get(`/note-examen/${id}`);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/note-examen/${id}`);
  },

  update: async (id: number, data: updateNoteExamen): Promise<NoteExamenType> => {
    const response = await axiosClient.put(`/note-examen/${id}`, data);
    return response.data;
  },
}