
export type EtudiantType = {
  id: number;
  matricule: string;
  nom: string;
  prenom: string;
  dateNaissance: Date;
  adresse: number;
  ContactEtudiants: contactEtudiantType[];
  photo: string;
}

export type EtudiantListResponse = {
    data: EtudiantType[];
    Items: number;
    Pages:number;
    currentPage: number;
}


export type createEtudiant = {
  matricule: string;
  nom: string;
  prenom: string;
  dateNaissance: Date;
  adresse: number;
  photo: number;
};

export type updateEtudiant = {
  matricule: string;
  nom: string;
  prenom: string;
  dateNaissance: Date;
  adresse: number;
  photo: number;
};

export type contactEtudiantType = {
  id: number;
  IdEtudiant: number;
  contact: string;
}