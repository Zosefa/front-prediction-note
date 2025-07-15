
export type GerantType = {
  id: number;
  email: string;
  nom: string;
  prenom: string;
  password: string;
  isPasswordTemp: boolean;
}

export type GerantListResponse = {
    data: GerantType[];
    Items: number;
    Pages:number;
    currentPage: number;
}


export type createGerant = {
  email: string;
  nom: string;
  prenom: string;
  password: string;
  isPasswordTemp: boolean;
};

export type updateGerant = {
  email: string;
  nom: string;
  prenom: string;
  password: string;
  isPasswordTemp: boolean;
};
