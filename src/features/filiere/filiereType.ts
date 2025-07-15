
export type FiliereType = {
  id: number;
  codef: string;
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
  codef: string;
  filiere: string;
  description: string;
};

export type updateFiliere = {
  codef: string;
  filiere: string;
  description: string;
};
