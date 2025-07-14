
export type PromotionType = {
  id: number;
  codeP: string;
  promotion: string;
  description: string;
}

export type PromotionListResponse = {
    data: PromotionType[];
    Items: number;
    Pages:number;
    currentPage: number;
}


export type createPromotion = {
  codeP: string;
  promotion: string;
  description: string;
};

export type updatePromotion = {
  codeP: string;
  promotion: string;
  description: string;
};
