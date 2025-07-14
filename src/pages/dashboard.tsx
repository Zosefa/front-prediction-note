import { Outlet } from "react-router-dom";
import Sidebar from "../components/sideBar";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
