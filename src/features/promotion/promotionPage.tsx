import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { PromotionService } from "./promotionAPI";
import type { PromotionType } from "./promotionType";
import { Loader } from "../../components/loader";
import { Edit, Plus, Trash2 } from "react-feather";

export default function Promotion() {
  const [loading, setLoading] = useState(false);
  const [Promotion, setPromotion] = useState<PromotionType[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    size: 5,
    totalItems: 0,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [editingPromotion, setEditingPromotion] = useState<PromotionType | null>(null);
  const [formData, setFormData] = useState({
    codeP: '', promotion: '', description: ''
  });

  const loadPromotion = async (page = 1) => {
    try {
      setLoading(true);
      const data = await PromotionService.getAll(page, pagination.size, search);
      setPromotion(data.data);
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

  const handleDelete = async () => {
    if (selectedId) {
      await PromotionService.delete(selectedId);
      toast.success("Promotion supprimé.");
      loadPromotion();
    }
  };


  const handleEdit = (Promotion: PromotionType) => {
    setEditingPromotion(Promotion);
    setFormData({
      codeP: Promotion.codeP,
      promotion: Promotion.promotion,
      description: Promotion.description,
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingPromotion(null);
    setFormData({ codeP: '', promotion: '', description: '' });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        codeP: formData.codeP,
        promotion: formData.promotion,
        description: formData.description,
      };

      if (editingPromotion) {
        await PromotionService.update(editingPromotion.id, payload);
        toast.success("Promotion modifiée avec succès");
      } else {
        await PromotionService.create(payload);
        toast.success("Promotion ajoutée avec succès");
      }
      setShowModal(false);
      loadPromotion();
    } catch (err) {
      toast.error("Erreur lors de la sauvegarde");
    }
  };

  useEffect(() => {
    loadPromotion();
  }, [pagination.size, search]);

  if (loading) return <Loader />;

  return (
    <div className="p-6 bg-white rounded-lg dark:bg-gray-800 shadow min-h-screen w-auto">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Liste des Promotions</h1>
        </div>

        <div className="mb-4 flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={handleSearchChange}
            className="w-full md:w-1/3 px-4 py-2 dark:bg-gray-900 dark:text-white border border-gray-300 rounded shadow-sm"
          />
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300"
          >
            <Plus size={20} /> Ajouter
          </button>
        </div>

        <div className="overflow-x-auto bg-white shadow border-gray-300 dark:bg-gray-900 rounded-lg">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-100 text-center text-lg text-gray-600 dark:bg-gray-900 dark:text-gray-300">
              <tr>
                <th className="px-4 py-3 text-left">Code Promotion</th>
                <th className="px-4 py-3 text-left">Nom Promotion</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Promotion.map((prom) => (
                <tr key={prom.id} className="border-b border-gray-100 dark:text-gray-300 ">
                  <td className="px-4 py-2">{prom.codeP}</td>
                  <td className="px-4 py-2">{prom.promotion}</td>
                  <td className="px-4 py-2">{prom.description}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button onClick={() => handleEdit(prom)} className="text-blue-600 border-gray-300 hover:text-blue-800">
                      <Edit size={20} className="inline" />
                    </button>
                    <button onClick={() => 
                      setShowDeleteModal(true)
                    
                    } className="text-red-600 hover:text-red-800">
                      <Trash2 size={20} className="inline" />
                    </button>
                  </td>
                </tr>

              ))}
              {Promotion.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-400">
                    Aucune Promotion trouvé.
                  </td>
                </tr>

              )}
            </tbody>
          </table>
        </div>
        {showDeleteModal && (
          <div id="popup-modal" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-4 md:p-5 text-center">
                  <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Etes-vous sure de vouloir supprimer cette Promotion ?</h3>
                  <button data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center" onClick={() => handleDelete()}>
                    Oui, je suis sure
                  </button>
                  <button data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => setShowDeleteModal(false)}>Non, annuler</button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: pagination.totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => loadPromotion(i + 1)}
              className={`px-3 py-1 rounded-full border ${pagination.page === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-30">
            <div className="relative w-full max-w-md p-4">
              {/* Modal content */}
              <div className="relative rounded-lg bg-white shadow-sm dark:bg-gray-700">
                {/* Modal header */}
                <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {editingPromotion ? "Modifier une Promotion" : "Ajouter une Promotion"}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      className="h-3 w-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Fermer le modal</span>
                  </button>
                </div>

                {/* Modal body */}
                <form onSubmit={handleSubmit} className="p-4 md:p-5">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        Code Promotion
                      </label>
                      <input
                        type="text"
                        value={formData.codeP}
                        onChange={(e) =>
                          setFormData({ ...formData, codeP: e.target.value })
                        }
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        placeholder="Ex: INF"
                        required
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        Nom Promotion
                      </label>
                      <input
                        type="text"
                        value={formData.promotion}
                        onChange={(e) =>
                          setFormData({ ...formData, promotion: e.target.value })
                        }
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        placeholder="Ex: Informatique"
                        required
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        placeholder="Ex: Promotion orientée développement web"
                        required
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="rounded-lg bg-gray-300 px-5 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      {editingPromotion ? "Modifier" : "Ajouter"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
