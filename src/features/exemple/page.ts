import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import { Modal } from "../../components/ui/modal";
import { useModal } from "../../hooks/useModal";
import { useToast } from "../../context/ToastContext";
import { CategorieServices, CategorieType } from "../../services/categorie/CategorieService";
import { Loader } from "../../components/ui/loader/Loader";
import { Pagination } from "../../components/ui/pagination/Pagination";

export default function Categorie() {
  const { isOpen, openModal, closeModal } = useModal();
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState({
    name: ''
  });

  const [selectedCategorie, setSelectedCategorie] = useState<CategorieType>({
    id: 0, 
    name: ''
  });

  const [categories, setCategories] = useState<CategorieType[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    totalItems: 0,
    totalPages: 1
  });

  const loadCategories = async (page = 1) => {
    setLoading(true);
    try {
      const data = await CategorieServices.getAll(page, pagination.size);
      setCategories(data.data);
      setPagination({
        ...pagination,
        page,
        totalItems: data.Items || 0,
        totalPages: data.Pages || 1
      });
    } catch (error) {
      showToast({
        message:  : "Une erreur inconnue est survenue",
        variant: "error",
        duration: 3000
      });
    } finally {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }
  };

  useEffect(() => {
    loadCategories();
  }, [pagination.size]);

  const resetForm = () => {
    setFormData({
      name: ''
    });
  };

  const validateForm = () => {
    return formData.name.trim() !== '';
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast({
        message: "Veuillez remplir tous les champs obligatoires",
        variant: "error",
        duration: 3000
      });
      return;
    }

    try {
      await CategorieServices.create({
        name: formData.name
      });
      await loadCategories(pagination.page);
      resetForm();
      showToast({
        message: "Catégorie enregistrée avec succès",
        variant: "success",
        duration: 3000
      });
    } catch (error) {
      showToast({
        message: error instanceof Error ? error.message : "Une erreur inconnue est survenue",
        variant: "error",
        duration: 3000
      });
    }
  };

  const onSaveUpdate = async () => {
    try {
      await CategorieServices.update(selectedCategorie.id, {
        name: selectedCategorie.name
      });
      await loadCategories(pagination.page);
      closeModal();
      showToast({
        message: "Catégorie mise à jour avec succès",
        variant: "success",
        duration: 3000
      });
    } catch (error) {
      showToast({
        message: error instanceof Error ? error.message : "Erreur lors de la mise à jour",
        variant: "error",
        duration: 3000
      });
    }
  };

  const handleSelectedCategorie = (categorie: CategorieType) => {
    setSelectedCategorie(categorie);
    openModal();
  };

  const handleDeleteCategorie = async (id: number) => {
    try {
      await CategorieServices.delete(id);
      await loadCategories(pagination.page);
      showToast({
        message: "Catégorie supprimée avec succès",
        variant: "success",
        duration: 3000
      });
    } catch (error) {
      showToast({
        message: error instanceof Error ? error.message : "Erreur lors de la suppression",
        variant: "error",
        duration: 3000
      });
    }
  };

  return (
    <div>
      <PageMeta
        title="Magasin | Catégorie"
        description="Page de catégorie de produit"
      />
      <PageBreadcrumb pageTitle="Catégorie Produit" />

      <form className="flex flex-col" onSubmit={onSubmit}>
        <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Label>Catégorie</Label>
              <Input
                type="text"
                placeholder="Catégorie" 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                value={formData.name}
              />
            </div>
            <div className="lg:col-span-2 flex items-end">
              <Button size="sm" type="submit" variant="success" className="w-full">
                Enregistrer
              </Button>
            </div>
          </div>
        </div>
      </form>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Catégorie
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-center"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {loading ? (
                <Loader variant="dots" size="lg" fullScreen />
              ) : categories.length === 0 ? (
                <TableRow>
                  <TableCell className="text-center py-4">
                    Aucune catégorie trouvée
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {c.name}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400 space-x-2">
                      <button
                        onClick={() => handleSelectedCategorie(c)}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                            fill=""
                          />
                        </svg>
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDeleteCategorie(c.id)}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-red-600 shadow-theme-xs hover:bg-gray-50 hover:text-red-800 dark:border-gray-700 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-white/[0.03] dark:hover:text-red-200"
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0ZM12.7279 5.27208C13.0184 5.56261 13.0184 6.03548 12.7279 6.32601L10.0539 9L12.7279 11.674C13.0184 11.9645 13.0184 12.4374 12.7279 12.7279C12.4374 13.0184 11.9645 13.0184 11.674 12.7279L9 10.0539L6.32601 12.7279C6.03548 13.0184 5.56261 13.0184 5.27208 12.7279C4.98156 12.4374 4.98156 11.9645 5.27208 11.674L7.94614 9L5.27208 6.32601C4.98156 6.03548 4.98156 5.56261 5.27208 5.27208C5.56261 4.98156 6.03548 4.98156 6.32601 5.27208L9 7.94614L11.674 5.27208C11.9645 4.98156 12.4374 4.98156 12.7279 5.27208Z"
                            fill=""
                          />
                        </svg>
                        Supprimer
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {!loading && categories.length > 0 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={(page) => loadCategories(page)}
        />
      )}

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px]">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-center mb-6">Modification Catégorie</h3>

          <form className="space-y-4">
            <div>
              <Label>Catégorie</Label>
              <Input
                value={selectedCategorie.name}
                onChange={(e) => setSelectedCategorie({...selectedCategorie, name: e.target.value})}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={closeModal}>
                Annuler
              </Button>
              <Button onClick={onSaveUpdate}>
                Enregistrer
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}