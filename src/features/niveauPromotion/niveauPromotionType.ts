
export type niveauPromotionType = {
  id: number;
  niveauId: number;
  promotionId: number;
  dateDebut: Date;
  dateFin: Date;
}

export type niveauPromotionListResponse = {
    data: niveauPromotionType[];
    Items: number;
    Pages:number;
    currentPage: number;
}


export type createniveauPromotion = {
  niveauId: number;
  promotionId: number;
  dateDebut: Date;
  dateFin: Date;
};

export type updateniveauPromotion = {
  niveauId: number;
  promotionId: number;
  dateDebut: Date;
  dateFin: Date;
};
