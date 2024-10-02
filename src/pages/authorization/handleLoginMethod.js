import { toast } from "react-toastify";

const handleLoginMethod = (data,handleLogin, handleAdminLogin ) => {
  if (!data || !data.userId || !data.token || !data.roles) {
    toast.error("Invalid login data!");
    return "/login"; 
  }
  console.log("data.role",data.roles[0].name)
  sessionStorage.setItem("userId", data.userId);
  sessionStorage.setItem("roles", data.roles[0].name);
  sessionStorage.setItem("token", data.token);
  sessionStorage.setItem("username", data.email);

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
