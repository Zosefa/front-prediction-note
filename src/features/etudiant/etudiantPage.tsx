import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { EtudiantService } from "./etudiantAPI";
import type { EtudiantType } from "./etudiantType";
import { Loader } from "../../components/loader";
import { Edit, Plus, Trash2 } from "react-feather";

export default function Etudiant() {
  const [loading, setLoading] = useState(false);
  const [etudiant, setEtudiant] = useState<EtudiantType[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    size: 5,
    totalItems: 0,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingEtudiant, setEditingEtudiant] = useState<EtudiantType | null>(null);
  const [formData, setFormData] = useState({
    matricule: '', nom: '', prenom: '', dateNaissance: '', adresse: '', photo: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const loadEtudiant = async (page = 1) => {
    try {
      setLoading(true);
      const data = await EtudiantService.getAll(page, pagination.size, search);
      setEtudiant(data.data);
      setPagination({
        ...pagination,
        page,
        totalItems: data.Items || 0,
        totalPages: data.Pages || 1,
      });
    } catch (error) {
      toast.error("Une erreur est survenue!");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Voulez-vous vraiment supprimer cet étudiant ?")) {
      await EtudiantService.delete(id);
      toast.success("Étudiant supprimé.");
      loadEtudiant();
    }
  };

  const handleEdit = (etudiant: EtudiantType) => {
    setEditingEtudiant(etudiant);
    setFormData({
      matricule: etudiant.matricule,
      nom: etudiant.nom,
      prenom: etudiant.prenom,
      dateNaissance: etudiant.dateNaissance.toString().substring(0, 10),
      adresse: etudiant.adresse.toString(),
      photo: etudiant.photo,
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingEtudiant(null);
    setFormData({ matricule: '', nom: '', prenom: '', dateNaissance: '', adresse: '', photo: '' });
    setSelectedFile(null);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        adresse: parseInt(formData.adresse),
        dateNaissance: new Date(formData.dateNaissance),
      };

      if (editingEtudiant) {
        await EtudiantService.update(editingEtudiant.id, payload);
        toast.success("Étudiant modifié avec succès");
      } else {
        await EtudiantService.create(payload);
        toast.success("Étudiant ajouté avec succès");
      }
      setShowModal(false);
      loadEtudiant();
    } catch (err) {
      toast.error("Erreur lors de la sauvegarde");
    }
  };

  const handleImageChange = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, photo: '' });
    }
  };

  useEffect(() => {
    loadEtudiant();
  }, [pagination.size, search]);

  if (loading) return <Loader />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Liste des étudiants</h1>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300"
          >
            <Plus size={18} /> Ajouter
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={handleSearchChange}
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded shadow-sm"
          />
        </div>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Matricule</th>
                <th className="px-4 py-3 text-left">Nom</th>
                <th className="px-4 py-3 text-left">Prénom</th>
                <th className="px-4 py-3 text-left">Date de naissance</th>
                <th className="px-4 py-3 text-left">Adresse</th>
                <th className="px-4 py-3 text-left">Photo</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {etudiant.map((etu) => (
                <tr key={etu.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-2">{etu.matricule}</td>
                  <td className="px-4 py-2">{etu.nom}</td>
                  <td className="px-4 py-2">{etu.prenom}</td>
                  <td className="px-4 py-2">{new Date(etu.dateNaissance).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{etu.adresse}</td>
                  <td className="px-4 py-2">
                    <img src={etu.photo} alt={etu.nom} className="w-10 h-10 object-cover rounded-full" />
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button onClick={() => handleEdit(etu)} className="text-blue-600 hover:text-blue-800">
                      <Edit size={16} className="inline" />
                    </button>
                    <button onClick={() => handleDelete(etu.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={16} className="inline" />
                    </button>
                  </td>
                </tr>
              ))}
              {etudiant.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    Aucun étudiant trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: pagination.totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => loadEtudiant(i + 1)}
              className={`px-3 py-1 rounded-full border ${pagination.page === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">
                {editingEtudiant ? "Modifier étudiant" : "Ajouter étudiant"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input name="matricule" value={formData.matricule} onChange={e => setFormData({ ...formData, matricule: e.target.value })} placeholder="Matricule" required className="w-full p-2 border rounded" />
                <input name="nom" value={formData.nom} onChange={e => setFormData({ ...formData, nom: e.target.value })} placeholder="Nom" required className="w-full p-2 border rounded" />
                <input name="prenom" value={formData.prenom} onChange={e => setFormData({ ...formData, prenom: e.target.value })} placeholder="Prénom" required className="w-full p-2 border rounded" />
                <input type="date" name="dateNaissance" value={formData.dateNaissance} onChange={e => setFormData({ ...formData, dateNaissance: e.target.value })} className="w-full p-2 border rounded" />
                <input name="adresse" value={formData.adresse} onChange={e => setFormData({ ...formData, adresse: e.target.value })} placeholder="Adresse" required className="w-full p-2 border rounded" />

                <div className="flex items-center justify-center w-full">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    {formData.photo ? (
                      <img src={formData.photo} alt="preview" className="object-cover w-full h-full rounded-lg" />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" viewBox="0 0 20 16" xmlns="http://www.w3.org/2000/svg">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500">PNG, JPG, JPEG ou GIF</p>
                      </div>
                    )}
                    <input id="dropzone-file" type="file" accept="image/*" onChange={(e) => handleImageChange(e.target.files?.[0] || null)} className="hidden" />
                  </label>
                </div>

                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded">Annuler</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Enregistrer</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
