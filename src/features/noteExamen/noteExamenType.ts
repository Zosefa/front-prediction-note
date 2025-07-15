
export type NoteExamenType = {
  id: number;
  matiereId: number;
  etudiantId: number;
  notes: number;
}

export type NoteExamenListResponse = {
    data: NoteExamenType[];
    Items: number;
    Pages:number;
    currentPage: number;
}


export type createNoteExamen = {
  matiereId: number;
  etudiantId: number;
  notes: number;
};

export type updateNoteExamen = {
  matiereId: number;
  etudiantId: number;
  notes: number;
};
