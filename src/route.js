import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Head from "./Components/common/header";
import Foot from "./Components/common/footer";
import Home from "./pages/Home";
import NotFound from "./Components/common/NotFound";
import BackToTopButton from "./Components/common/BacktoTop";
import Login from "./pages/authorization/Login";
import Register from "./pages/authorization/Register";
import ForgotPassword from "./pages/authorization/ForgetPassword";
import OTP from "./pages/authorization/OTP";
import Maps from "./pages/item_shift/Map";
import Shift from "./pages/Shift";
import HouseShift from "./pages/house_shift/HouseShift";
import ConfirmLocation from "./pages/common_pages/ConfirmLocation";
import Service from "./pages/common_pages/Service";
import SuccessFul from "./pages/common_pages/SuccessFul";
import Summary from "./pages/common_pages/CheckDetails";
import Payment from "./pages/common_pages/Payment";
import Invoices from "./pages/common_pages/Invoices";
import Cancel from "./pages/common_pages/Cancel";
import User from "./pages/profile/Profile";
import Coupons from "./pages/profile/Coupons";
import Order from "./pages/profile/Rides";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer } from "react-toastify";

function UserRoute() {
  AOS.init({
    duration: 800,
    delay: 200,
  });
  return (
    <Router>
      <ToastContainer />
      <Head />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgetpassword" element={<ForgotPassword />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/map" element={<Maps />} />
          <Route path="/shift" element={<Shift />} />
          <Route path="/houseshift" element={<HouseShift />} />
          <Route path="/confirmlocation" element={<ConfirmLocation />} />
          <Route path="/service" element={<Service />} />
          <Route path="/successful" element={<SuccessFul />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/payments" element={<Payment />} />
          <Route path="/invoice" element={<Invoices />} />
          <Route path="/cancelorder" element={<Cancel />} />
          <Route path="/user" element={<User />} />
          <Route path="/rides" element={<Order />} />
          <Route path="/coupons" element={<Coupons />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <BackToTopButton />
      <Foot />
    </Router>
  );
}

export default UserRoute;
