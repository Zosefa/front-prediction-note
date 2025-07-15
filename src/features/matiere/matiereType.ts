
export type MatiereType = {
  id: number;
  codeM: string;
  description: string;
}

export type MatiereListResponse = {
    data: MatiereType[];
    Items: number;
    Pages:number;
    currentPage: number;
}


export type createMatiere = {
  codeM: string;
  description: string;
};

export type updateMatiere = {
  codeM: string;
  description: string;
};
