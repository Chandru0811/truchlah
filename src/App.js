import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'antd/dist/reset.css';
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";

function UserRoute() {
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = () => {
    sessionStorage.setItem("isAuthenticate", true);
    setIsAuthenticate(true);
    setIsAdmin(false);
  };

  const handleAdminLogin = () => {
    sessionStorage.setItem("isAdmin", true);
    sessionStorage.setItem("token", "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwic3ViIjoic3JpQGdtYWlsLmNvbSIsImlhdCI6MTcyNjIyMjU1MSwiZXhwIjoxNzMzOTk4NTUxfQ.bms7mJlDFJnugfoj_SnI2z4Gul-BeakmrWDGOPkWDxNXAmOSxzcUQXvG0JavVZs0U6p7cHH2dVJVsQi9wkHV2w");
    setIsAuthenticate(false);
    setIsAdmin(true);
  };

  const handleLogout = async () => {
    // Your logout logic
    sessionStorage.removeItem("isAdmin");
    sessionStorage.removeItem("isAuthenticate");
    sessionStorage.removeItem("roles");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("token");
    setIsAuthenticate(false);
    setIsAdmin(false);
  };

  useEffect(() => {
    const isAdminFromStorage = sessionStorage.getItem("isAdmin") === "true";
    const isAuthenticateFromStorage =
      sessionStorage.getItem("isAuthenticate") === "true";
    setIsAuthenticate(isAuthenticateFromStorage);
    setIsAdmin(isAdminFromStorage);
  }, []);

  return (
    <div>
      <ToastContainer position="top-center" />
      {isAdmin ? (
        <AdminLayout handleLogout={handleLogout} />
      ) : (
        <UserLayout
          isAuthenticate={isAuthenticate}
          handleAdminLogin={handleAdminLogin}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default UserRoute;
