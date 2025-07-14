
export type niveauPromotionMatiereType = {
  id: number;
  niveauPromotionId: number;
  matiereId: number;
  coeff: number;
}

export type niveauPromotionMatiereListResponse = {
    data: niveauPromotionMatiereType[];
    Items: number;
    Pages:number;
    currentPage: number;
}


export type createniveauPromotionMatiere = {
  id: number;
  niveauPromotionId: number;
  matiereId: number;
  coeff: number;
};

export type updateniveauPromotionMatiere = {
  id: number;
  niveauPromotionId: number;
  matiereId: number;
  coeff: number;
};
