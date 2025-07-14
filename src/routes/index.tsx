import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../components/dashboard";
import Filiere from "../features/filiere/filierePage";
import Etudiant from "../features/etudiant/etudiantPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      // { index: true, element: <Filiere /> },
      { path: "/filieres", element: <Filiere /> },
      { path: "/etudiants", element: <Etudiant /> },
    ],
  },
]);
