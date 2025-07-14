
export type FiliereType = {
  id: number;
  codeF: string;
  filiere: string;
  description: string;
}

export type FiliereListResponse = {
    data: FiliereType[];
    Items: number;
    Pages:number;
    currentPage: number;
}


export type createFiliere = {
  codeF: string;
  filiere: string;
  description: string;
};

export type updateFiliere = {
  codeF: string;
  filiere: string;
  description: string;
};
