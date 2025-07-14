import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FiliereService } from "./filiereApi";
import type { FiliereType } from "./filiereType";
import { Loader } from "../../components/loader";
import { Edit, Plus, Trash2 } from "react-feather";

export default function Filiere() {
  const [loading, setLoading] = useState(false);
  const [filiere, setFiliere] = useState<FiliereType[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    size: 5,
    totalItems: 0,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingFiliere, setEditingFiliere] = useState<FiliereType | null>(null);
  const [formData, setFormData] = useState({
    codeF: '', filiere: '', description: ''
  });

  const loadFiliere = async (page = 1) => {
    try {
      setLoading(true);
      const data = await FiliereService.getAll(page, pagination.size, search);
      setFiliere(data.data);
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
    if (confirm("Voulez-vous vraiment supprimer cette filière ?")) {
      await FiliereService.delete(id);
      toast.success("Filière supprimé.");
      loadFiliere();
    }
  };

  const handleEdit = (filiere: FiliereType) => {
    setEditingFiliere(filiere);
    setFormData({
      codeF: filiere.codeF,
      filiere: filiere.filiere,
      description: filiere.description,
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingFiliere(null);
    setFormData({ codeF: '', filiere: '', description: '' });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        adresse: parseInt(formData.codeF),
        dateNaissance: new Date(formData.filiere),
        description: new Date(formData.description),
      };

      if (editingFiliere) {
        await FiliereService.update(editingFiliere.id, payload);
        toast.success("Filière modifié avec succès");
      } else {
        await FiliereService.create(payload);
        toast.success("Filière ajouté avec succès");
      }
      setShowModal(false);
      loadFiliere();
    } catch (err) {
      toast.error("Erreur lors de la sauvegarde");
    }
  };

  useEffect(() => {
    loadFiliere();
  }, [pagination.size, search]);

  if (loading) return <Loader />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Liste des Filières</h1>
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
                <th className="px-4 py-3 text-left">Code filière</th>
                <th className="px-4 py-3 text-left">Nom filière</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filiere.map((fil) => (
                <tr key={fil.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-2">{fil.codeF}</td>
                  <td className="px-4 py-2">{fil.filiere}</td>
                  <td className="px-4 py-2">{fil.description}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button onClick={() => handleEdit(fil)} className="text-blue-600 hover:text-blue-800">
                      <Edit size={16} className="inline" />
                    </button>
                    <button onClick={() => handleDelete(fil.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={16} className="inline" />
                    </button>
                  </td>
                </tr>
              ))}
              {Filiere.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    Aucune Filière trouvé.
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
              onClick={() => loadFiliere(i + 1)}
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
                {editingFiliere ? "Modifier Filière" : "Ajouter Filière"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input name="matricule" value={formData.codeF} onChange={e => setFormData({ ...formData, codeF: e.target.value })} placeholder="Matricule" required className="w-full p-2 border rounded" />
                <input name="nom" value={formData.filiere} onChange={e => setFormData({ ...formData, filiere: e.target.value })} placeholder="Nom" required className="w-full p-2 border rounded" />
                <input name="prenom" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Prénom" required className="w-full p-2 border rounded" />
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
