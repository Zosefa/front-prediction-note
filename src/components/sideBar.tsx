import { useState } from "react";
import { Award, BarChart2, BookOpen, Calendar, Camera, Clipboard, FileText, Folder, Home, Layers, PieChart, Shield, User, UserPlus } from "react-feather";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [studentDropdownOpen, setStudentDropdownOpen] = useState(false);
  const [niveauDropdown, setNiveauDropdown] = useState(false);
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 sm:translate-x-0"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          <li>
            <NavLink
              to="#"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <Home size={20} /> <span className="ms-3">Dashboard</span>
            </NavLink>
          </li>

 {/* Dropdown Étudiants */}
          <li className="relative">
            <button
              type="button"
              onClick={() => setStudentDropdownOpen(!studentDropdownOpen)}
              className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <User size={20} />
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                Étudiants
              </span>
              <svg
                className={`w-3 h-3 ms-auto transition-transform ${studentDropdownOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {studentDropdownOpen && (
              <ul className="py-2 space-y-2">
                <li>
                  <NavLink
                    to="/etudiants"
                    className="flex items-center w-full p-2 pl-11 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Liste Étudiants
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contacts"
                    className="flex items-center w-full p-2 pl-11 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Contact Étudiants
                  </NavLink>
                </li> 
              </ul>
            )}
          </li>


          <li>
            <NavLink
              to="/filieres"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <Layers size={20} /> <span className="ms-3">Filières</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="#"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <FileText size={20} /> <span className="ms-3">Examen</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="#"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <Shield size={20} /> <span className="ms-3">Gérant</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="#"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <BookOpen size={20} /> <span className="ms-3">Matières</span>
            </NavLink>
          </li>
          <li className="relative">
            <button
              type="button"
              onClick={() => setNiveauDropdown(!niveauDropdown)}
              className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <BarChart2 size={20} />
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                Niveau
              </span>
              <svg
                className={`w-3 h-3 ms-auto transition-transform ${niveauDropdown ? 'rotate-180' : ''}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {niveauDropdown && (
              <ul className="py-2 space-y-2">
                <li>
                  <NavLink
                    to="#"
                    className="flex items-center w-full p-2 pl-11 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                  Liste des niveaux
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/niveau"
                    className="flex items-center w-full p-2 pl-11 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                  Niveau par promotion
                  </NavLink>
                </li> 
                <li>
                  <NavLink
                    to="#"
                    className="flex items-center w-full p-2 pl-11 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                  Niveau par promotion / matière
                  </NavLink>
                </li> 
              </ul>
            )}
          </li>
          <li>
            <NavLink
              to="#"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <Clipboard size={20} /> <span className="ms-3">Note d'examen</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="#"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <Calendar size={20} /> <span className="ms-3">Semestre</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="#"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <Folder size={20} /> <span className="ms-3">Semestre niveau promotion</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/promotions"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <Camera size={20} /> <span className="ms-3">Promotion</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}