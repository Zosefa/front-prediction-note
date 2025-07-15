
import { Outlet } from "react-router-dom";
import Navbar from "./navBar";
import Sidebar from "./sideBar";

export default function DashboardLayout() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <main className="p-2 sm:ml-64 mt-14 bg-gray-100 dark:bg-gray-800">
        <Outlet /> 
      </main>
    </div>
  );
}
