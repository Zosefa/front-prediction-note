import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {  } from "./contactEtudiantAPI";
import type { contactEtudiantType } from "./contactEtudiantType";

export default function Etudiant () {
    const [loading, setLoading] = useState(false);
    const [etudiant, setEtudiant] = useState<contactEtudiantType[]>([]);
    const [pagination, setPagination] = useState({
        page: 1,
        size: 10,
        totalItems: 0,
        totalPages: 1
    });
    const [formData, setFormData] = useState({
        etudiantId: '', contact: ''
    })

    const loadEtudiant = async (page = 1) => {
    setLoading(true);
    try {
        const data = await EtudiantService.getAll(page, pagination.size);
        setEtudiant(data.data);
        setPagination({
        ...pagination,
        page,
        totalItems: data.Items || 0,
        totalPages: data.Pages || 1
        });
    } catch (error) {
        toast.error( "Une erreur inconnue est survenue", error instanceof Error ?);
    } finally {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }
    };

    useEffect(() => {
        loadEtudiant();
    }, [pagination.size]);

    const resetForm = () => {
        setFormData({
            matricule: '', nom: '', prenom: '', dateNaissance: '', adress: '', photo: ''
        });
    };

    return (
        <>
        
        </>
    )

}