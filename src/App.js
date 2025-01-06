import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import { Toaster } from "react-hot-toast";

function UserRoute() {
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loader, setLoader] = useState(true);
  const handleLogin = () => {
    localStorage.setItem("isAuthenticate", true);
    setIsAuthenticate(true);
    setIsAdmin(false);
  };

  const handleAdminLogin = () => {
    localStorage.setItem("isAdmin", true);
    setIsAuthenticate(false);
    setIsAdmin(true);
  };

  const handleLogout = async () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isAuthenticate");
    localStorage.removeItem("roles");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setIsAuthenticate(false);
    setIsAdmin(false);
  };

  useEffect(() => {
    setLoader(true);
    const isAdminFromStorage = localStorage.getItem("isAdmin") === "true";
    const isAuthenticateFromStorage =
      localStorage.getItem("isAuthenticate") === "true";
    setIsAuthenticate(isAuthenticateFromStorage);
    setIsAdmin(isAdminFromStorage);
    setLoader(false);
  }, []);

  return (
    <div>
      {loader ? (
        ""
      ) : (
        <>
          <ToastContainer position="top-center" />
          <Toaster position="top-center" reverseOrder={false} />
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
        </>
      )}
    </div>
  );
}

export default UserRoute;
