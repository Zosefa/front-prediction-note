
import { Outlet } from "react-router-dom";
import Navbar from "./navBar";
import Sidebar from "./sideBar";

export default function DashboardLayout() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <main className="p-2 sm:ml-64 mt-16 bg-gray-100">
        <Outlet /> 
      </main>
    </div>
  );
}
