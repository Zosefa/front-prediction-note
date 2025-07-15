
export type NiveauType = {
  id: number;
  codeN: string;
  niveau: string;
  description: string;
}

export type NiveauListResponse = {
    data: NiveauType[];
    Items: number;
    Pages:number;
    currentPage: number;
}


export type createNiveau = {
  codeN: string;
  niveau: string;
  description: string;
};

export type updateNiveau = {
  codeN: string;
  niveau: string;
  description: string;
};
