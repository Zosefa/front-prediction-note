
export type SemestreType = {
  id: number;
  semestre: string;
  description: string;
}

export type SemestreListResponse = {
    data: SemestreType[];
    Items: number;
    Pages:number;
    currentPage: number;
}


export type createSemestre = {
  semestre: string;
  description: string;
};

export type updateSemestre = {
  semestre: string;
  description: string;
};
