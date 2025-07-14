
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Etudiant from "../features/etudiant/etudiantPage";
import Login from "../Auth/login";
import Filiere from "../features/filiere/filierePage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/etudiants" />} /> */}
        <Route path="/etudiants" element={<Etudiant />} />
        <Route path="/filieres" element={<Filiere />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
