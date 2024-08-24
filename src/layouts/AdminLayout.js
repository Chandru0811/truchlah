import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import DashboardAdmin from "../pages/DashboardAdmin";

function AdminLayout({ handleLogout }) {
  return (
    <div>
      <BrowserRouter>
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
          <Dashboard onLogout={handleLogout} />
          <div className="h-screen flex-grow-1 overflow-y-lg-auto">
            <main className="py-1 bg-surface-secondary">
              <Routes>
                <Route path="/" element={<DashboardAdmin />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default AdminLayout;
