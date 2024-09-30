import { toast } from "react-toastify";

const handleLoginMethod = (data,handleLogin, handleAdminLogin ) => {
  if (!data || !data.userId || !data.token || !data.roles) {
    toast.error("Invalid login data!");
    return "/login"; 
  }
  sessionStorage.setItem("userId", data.userId);
  sessionStorage.setItem("roles", data.roles[0]);
  sessionStorage.setItem("token", data.token);
  sessionStorage.setItem("username", data.username);

  if (data?.roles?.[0] === "ROLE_ADMIN" || data?.roles?.[0] === "ROLE_STAFF") {
    toast.success("Login Successful!");
    handleAdminLogin();
   return "/" 
  } else {
    toast.success("Login Successful!");
    handleLogin(); 
    return "/shift"
  }
};

export default handleLoginMethod;
