// import type { createContactEtudiant, contactEtudiantListResponse, contactEtudiantType, updateContactEtudiant } from "./contactEtudiantType";
// import axiosClient from "../../services/interceptor";

// export const EtudiantService = {
//   create: async (data: createContactEtudiant): Promise<contactEtudiantType> => {
//     const response = await axiosClient.post("/contact-etudiants", data);
//     return response.data;
//   },

//   getAll: async (page = 1, size = 10, search = ''): Promise<contactEtudiantListResponse> => {
//     const response = await axiosClient.get("/contact-etudiants", {
//       params: { page, size, search }
//     });
//     return response.data;
//   },

//   getById: async (id: number): Promise<contactEtudiantType> => {
//     const response = await axiosClient.get(`/contact-etudiants/${id}`);
//     return response.data;
//   },

//   delete: async (id: number): Promise<void> => {
//     await axiosClient.delete(`/contact-etudiants/${id}`);
//   },

//   update: async (id: number, data: updateContactEtudiant): Promise<contactEtudiantType> => {
//     const response = await axiosClient.put(`/contact-etudiants/${id}`, data);
//     return response.data;
//   },
// };


