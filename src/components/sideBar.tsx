import { NavLink } from "react-router-dom";
import { Book, Users, FileText } from "react-feather";

const links = [
  { to: "/etudiants", label: "Étudiants", icon: Users },
  { to: "/contact-etudiants", label: "Contact Étudiant", icon: FileText },
  { to: "/examens", label: "Examens", icon: Book },
  { to: "/filieres", label: "Filières", icon: Book },
  { to: "/gerants", label: "Utilisateurs", icon: Users },
  { to: "/matieres", label: "Matières", icon: Book },
  { to: "/niveaux", label: "Niveaux", icon: Book },
  { to: "/niveau-promotions", label: "Niveau-Promotion", icon: Book },
  { to: "/niveau-promotion-matieres", label: "NP-Matière", icon: Book },
  { to: "/notes", label: "Notes", icon: FileText },
  { to: "/promotions", label: "Promotions", icon: Book },
  { to: "/semestres", label: "Semestres", icon: Book },
  { to: "/semestre-niveau-promotions", label: "SNP", icon: Book },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r shadow-md min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Dashboard</h1>
      <nav className="space-y-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition ${
                isActive ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
