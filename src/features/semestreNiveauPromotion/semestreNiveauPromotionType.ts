
export type semestreNiveauPromotionType = {
  id: number;
  semestreId: number;
  niveauPromotionId: string;
  dateDebut: Date;
  datefin: Date;
}

export type semestreNiveauPromotionListResponse = {
    data: semestreNiveauPromotionType[];
    Items: number;
    Pages:number;
    currentPage: number;
}


export type createsemestreNiveauPromotion = {
  semestreId: number;
  niveauPromotionId: string;
  dateDebut: Date;
  datefin: Date;
};

export type updatesemestreNiveauPromotion = {
  semestreId: number;
  niveauPromotionId: string;
  dateDebut: Date;
  datefin: Date;
};
