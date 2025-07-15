
export type ExamenType = {
  id: number;
  dateExamen: Date;
  semestreNiveauPromotionId: number;
}

export type ExamenListResponse = {
    data: ExamenType[];
    Items: number;
    Pages:number;
    currentPage: number;
}


export type createExamen = {
  dateExamen: Date;
  semestreNiveauPromotionId: number;
};

export type updateExamen = {
  dateExamen: Date;
  semestreNiveauPromotionId: number;
};
