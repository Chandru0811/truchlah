import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";

function AdminLayout({ handleLogout }) {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard handleLogout={handleLogout}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AdminLayout;
