import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { EtudiantService } from "./etudiantAPI"; // Ton API service axios
import type { EtudiantType } from "./etudiantType"; // Ton type
import { Loader } from "../../components/loader";
import { Edit, PhoneCall, Plus, Trash2 } from "react-feather";
import type { FiliereType } from "../filiere/filiereType";
import type { PromotionType } from "../promotion/promotionType";
import { FiliereService } from "../filiere/filiereApi";
import { PromotionService } from "../promotion/promotionAPI";
import type { contactEtudiantType } from "../contactEtudiant.ts/contactEtudiantType";

interface FormDataType {
  matricule: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  adresse: string;
  photo: string;
  promotionId: string;
  filiereId: string;
}

export default function Etudiant() {
  const baseUrlImage = import.meta.env.VITE_API_IMAGE_ETUDIANT_URL;
  const [loading, setLoading] = useState(false);
  const [etudiants, setEtudiants] = useState<EtudiantType[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    size: 5,
    totalItems: 0,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");
  const [contact, setContact] = useState<contactEtudiantType[]>([]);
  const [contactModal, setContactModal] = useState(false);
  const [filieres, setFilieres] = useState<FiliereType[]>([]);
  const [promotions, setPromotions] = useState<PromotionType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEtudiant, setEditingEtudiant] = useState<EtudiantType | null>(null);
  const [formData, setFormData] = useState<FormDataType>({
    matricule: "",
    nom: "",
    prenom: "",
    dateNaissance: "",
    adresse: "",
    photo: "",
    promotionId: "",
    filiereId: "",
  });
  const [formContact, setFormContact] = useState({ etudiantId: '', contact: '', })
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Chargement liste étudiants
  const loadEtudiant = async (page = 1) => {
    try {
      setLoading(true);
      const data = await EtudiantService.getAll(page, pagination.size, search);
      setEtudiants(data.data);
      setPagination({
        ...pagination,
        page,
        totalItems: data.Items || 0,
        totalPages: data.Pages || 1,
      });
    } catch {
      toast.error("Une erreur est survenue lors du chargement des étudiants.");
    } finally {
      setLoading(false);
    }
  };

  // Recherche texte
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Suppression étudiant
  const handleDelete = async (id: number) => {
    if (confirm("Voulez-vous vraiment supprimer cet étudiant ?")) {
      try {
        await EtudiantService.delete(id);
        toast.success("Étudiant supprimé.");
        loadEtudiant(pagination.page);
      } catch {
        toast.error("Erreur lors de la suppression.");
      }
    }
  };

  // Préparer édition
  const handleEdit = (etudiant: EtudiantType) => {
    setEditingEtudiant(etudiant);
    setSelectedFile(null); // Réinitialiser upload
    setFormData({
      matricule: etudiant.matricule,
      nom: etudiant.nom,
      prenom: etudiant.prenom,
      dateNaissance: etudiant.dateNaissance
        ? new Date(etudiant.dateNaissance).toISOString().substring(0, 10)
        : "",
      adresse: etudiant.adresse || "",
      photo: etudiant.photo || "", // Nom fichier reçu du serveur
      promotionId: etudiant.promotionId ? etudiant.promotionId.toString() : "",
      filiereId: etudiant.filiereId ? etudiant.filiereId.toString() : "",
    });
    setShowModal(true);
  };

  // Préparer ajout
  const handleAdd = () => {
    setEditingEtudiant(null);
    setSelectedFile(null);
    setFormData({
      matricule: "",
      nom: "",
      prenom: "",
      dateNaissance: "",
      adresse: "",
      photo: "",
      promotionId: "",
      filiereId: "",
    });
    setShowModal(true);
  };

  const handleAddContact = () => {
    setFormContact({ etudiantId: '', contact: '' });
    setContactModal(true);
  };

  const contactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formContact,
        etudiantId: formContact.etudiantId,
        contact: formContact.contact,
      };
      await EtudiantService.createContact(payload);
      toast.success("Contact ajouté avec succès");
      setContactModal(false);
      loadEtudiant();
    } catch (err) {
      toast.error("Erreur lors de la sauvegarde");
    }
  };

  // Upload image, preview base64
  const handleImageChange = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photo: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, photo: "" }));
    }
  };

  // Soumission formulaire avec FormData
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (
      !formData.matricule.trim() ||
      !formData.nom.trim() ||
      !formData.prenom.trim() ||
      !formData.dateNaissance ||
      !formData.adresse.trim()
    ) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      const form = new FormData();
      form.append("matricule", formData.matricule);
      form.append("nom", formData.nom);
      form.append("prenom", formData.prenom);
      form.append("dateNaissance", new Date(formData.dateNaissance).toISOString());
      form.append("adresse", formData.adresse);
      form.append("promotionId", formData.promotionId);
      form.append("filiereId", formData.filiereId);
      if (selectedFile) {
        form.append("photo", selectedFile);
      }

      if (editingEtudiant) {
        await EtudiantService.update(editingEtudiant.id, form);
        toast.success("Étudiant modifié avec succès");
      } else {
        await EtudiantService.create(form);
        toast.success("Étudiant ajouté avec succès");
        setLoading(false);

      }

      setShowModal(false);
      loadEtudiant(pagination.page);
    } catch (err) {
      toast.error("Erreur lors de la sauvegarde");
    }
  };
  useEffect(() => {
    FiliereService.getAll(1, 100).then(r => setFilieres(r.data));
    PromotionService.getAll(1, 100).then(r => setPromotions(r.data));
  }, []);

  useEffect(() => {
    loadEtudiant(pagination.page);
  }, [pagination.page, pagination.size, search]);

  if (loading) return <Loader />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-800">
      {/* <ToastContainer /> */}
      <div className="max-w-7xl mx-auto">
        <ToastContainer />
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Liste des étudiants</h1>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={handleSearchChange}
            className="w-full md:w-1/3 px-4 py-2 border dark:bg-gray-900 dark:text-gray-300 border-gray-300 rounded shadow-sm"
          />
          <div className="flex row gap-1">
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300 ml-4"
            >
              <Plus size={18} /> Ajouter
            </button>
            <button
              onClick={handleAddContact}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300"
            >
              <PhoneCall size={18} /> Ajouter un contact
            </button>
          </div>
        </div>

        <div className="overflow-x-auto bg-white shadow dark:bg-gray-900 dark:text-gray-300 rounded-lg">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-100 dark:bg-gray-900 dark:text-gray-300 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left"></th>
                <th className="px-4 py-3 text-left">Matricule</th>
                <th className="px-4 py-3 text-left">Nom</th>
                <th className="px-4 py-3 text-left">Prénom</th>
                <th className="px-4 py-3 text-left">Date de naissance</th>
                <th className="px-4 py-3 text-left">Adresse</th>
                <th className="px-4 py-3 text-left">Contact</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {etudiants.length > 0 ? (
                etudiants.map((etu) => {
                  const photoUrl = etu.photo
                    ? `${baseUrlImage}/${etu.photo}`
                    : "/default-avatar.png";
                  return (
                    <tr key={etu.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-2">
                        <img
                          src={photoUrl}
                          alt={etu.nom}
                          className="w-15 h-15 object-cover rounded-full"
                        />
                      </td>
                      <td className="px-4 py-2">{etu.matricule}</td>
                      <td className="px-4 py-2">{etu.nom.toUpperCase()}</td>
                      <td className="px-4 py-2">{etu.prenom}</td>
                      <td className="px-4 py-2">
                        {new Date(etu.dateNaissance).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2">{etu.adresse}</td>
                      <td className="px-4 py-2">
                          <ul>
                            {etu.ContactEtudiants.map((contact) => (
                              <li key={contact.id}>{contact.contact}</li>
                            ))}
                          </ul>
                      </td>
                      <td className="px-4 py-2 space-x-2">
                        <button
                          onClick={() => handleEdit(etu)}
                          className="text-blue-600 hover:text-blue-800"
                          aria-label={`Modifier ${etu.nom}`}
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(etu.id)}
                          className="text-red-600 hover:text-red-800"
                          aria-label={`Supprimer ${etu.nom}`}
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    Aucun étudiant trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: pagination.totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => loadEtudiant(i + 1)}
              className={`px-3 py-1 rounded-full border ${pagination.page === i + 1
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600"
                }`}
              aria-current={pagination.page === i + 1 ? "page" : undefined}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {contactModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-center text-gray-700 dark:text-white">
                Ajouter un contact
              </h2>

              <form onSubmit={contactSubmit} className="space-y-4">
                <select value={formContact.etudiantId} onChange={e => setFormContact({ ...formContact, etudiantId: e.target.value })} required className="w-full border px-4 py-2 rounded shadow-sm dark:bg-gray-800 dark:text-white">
                  <option value="">Choisir un étudiant</option>
                  {etudiants.map(p => <option key={p.id} value={p.id}>{p.nom} N° {p.matricule}</option>)}
                </select>
                <input type="text" placeholder="Contact" value={formContact.contact} onChange={e => setFormContact({ ...formContact, contact: e.target.value })} className="w-full border px-4 py-2 rounded shadow-sm dark:bg-gray-800 dark:text-white" required />
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setContactModal(false)} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded">Annuler</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">Enregistrer</button>
                </div>
              </form>
            </div>
          </div>
        )}


        {showModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-center text-gray-700 dark:text-white">
                {editingEtudiant ? "Modifier l'étudiant" : "Ajouter un étudiant"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Matricule" value={formData.matricule} onChange={e => setFormData({ ...formData, matricule: e.target.value })} className="w-full border px-4 py-2 rounded shadow-sm dark:bg-gray-800 dark:text-white" required />
                <input type="text" placeholder="Nom" value={formData.nom} onChange={e => setFormData({ ...formData, nom: e.target.value })} className="w-full border px-4 py-2 rounded shadow-sm dark:bg-gray-800 dark:text-white" required />
                <input type="text" placeholder="Prénom" value={formData.prenom} onChange={e => setFormData({ ...formData, prenom: e.target.value })} className="w-full border px-4 py-2 rounded shadow-sm dark:bg-gray-800 dark:text-white" required />
                <input type="date" value={formData.dateNaissance} onChange={e => setFormData({ ...formData, dateNaissance: e.target.value })} className="w-full border px-4 py-2 rounded shadow-sm dark:bg-gray-800 dark:text-white" required />
                <input type="text" placeholder="Adresse" value={formData.adresse} onChange={e => setFormData({ ...formData, adresse: e.target.value })} className="w-full border px-4 py-2 rounded shadow-sm dark:bg-gray-800 dark:text-white" required />

                <select value={formData.filiereId} onChange={e => setFormData({ ...formData, filiereId: e.target.value })} required className="w-full border px-4 py-2 rounded shadow-sm dark:bg-gray-800 dark:text-white">
                  <option value="">Choisir une filière</option>
                  {filieres.map(f => <option key={f.id} value={f.id}>{f.filiere}</option>)}
                </select>

                <select value={formData.promotionId} onChange={e => setFormData({ ...formData, promotionId: e.target.value })} required className="w-full border px-4 py-2 rounded shadow-sm dark:bg-gray-800 dark:text-white">
                  <option value="">Choisir une promotion</option>
                  {promotions.map(p => <option key={p.id} value={p.id}>{p.promotion}</option>)}
                </select>

                <div className="flex items-center justify-center w-full">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
                    {formData.photo ? (
                      <img src={formData.photo} alt="preview" className="object-cover w-full h-full rounded-lg" />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 20 16" xmlns="http://www.w3.org/2000/svg">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Cliquez pour télécharger</span></p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, JPEG ou GIF</p>
                      </div>
                    )}
                    <input id="dropzone-file" type="file" accept="image/*" onChange={e => handleImageChange(e.target.files?.[0] || null)} className="hidden" />
                  </label>
                </div>

                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded">Annuler</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">Enregistrer</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
