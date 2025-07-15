import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../components/dashboard";
import Filiere from "../features/filiere/filierePage";
import Etudiant from "../features/etudiant/etudiantPage";
import Promotion from "../features/promotion/promotionPage";
import Niveau from "../features/niveau/niveauPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      // { index: true, element: <Filiere /> },
      { path: "/filieres", element: <Filiere /> },
      { path: "/etudiants", element: <Etudiant /> },
      { path: "/promotions", element: <Promotion /> },
      { path: "/niveau", element: <Niveau /> },
    ],
  },
]);
