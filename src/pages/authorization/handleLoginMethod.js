import { toast } from "react-toastify";

const handleLoginMethod = (data,handleLogin, handleAdminLogin ) => {
  if (!data || !data.userId || !data.token || !data.roles) {
    toast.error("Invalid login data!");
    return "/login"; 
  }
  console.log("data.role",data.roles[0].name)
  localStorage.setItem("userId", data.userId);
  localStorage.setItem("roles", data.roles[0].name);
  localStorage.setItem("token", data.token);
  localStorage.setItem("username", data.email);

  if (data?.roles?.[0].name === "ROLE_ADMIN" || data?.roles?.[0].name === "ROLE_STAFF") {
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
