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
    sessionStorage.setItem("isAuthenticate", true);
    setIsAuthenticate(true);
    setIsAdmin(false);
  };

  const handleAdminLogin = () => {
    sessionStorage.setItem("isAdmin", true);
    setIsAuthenticate(false);
    setIsAdmin(true);
  };

  const handleLogout = async () => {
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
    setLoader(true);
    const isAdminFromStorage = sessionStorage.getItem("isAdmin") === "true";
    const isAuthenticateFromStorage =
      sessionStorage.getItem("isAuthenticate") === "true";
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
