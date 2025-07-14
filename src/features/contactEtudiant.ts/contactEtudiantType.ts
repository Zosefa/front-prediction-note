
export type contactEtudiantType = {
  id: number;
  etudiantId: number;
  contact: string;
}

export type contactEtudiantListResponse = {
    data: contactEtudiantType[];
    Items: number;
    Pages:number;
    currentPage: number;
}


export type createContactEtudiant = {
  etudiantId: number;
  contact: string;
};

export type updateContactEtudiant = {
  etudiantId: number;
  contact: string;
};
