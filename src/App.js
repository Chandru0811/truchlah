import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Head from "./Components/common/header";
import Foot from "./Components/common/footer";
import Home from "./pages/Home";
import NotFound from "./Components/NotFound";
import BackToTopButton from "./Components/common/BacktoTop";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./Components/ForgetPassword";
import OTP from "./Components/OTP";
import Maps from "./Components/Map";
import Shift from "./Components/Shift";
import HouseShift from "./Components/HouseShift";
import ConfirmLocation from "./Components/ConfirmLocation";
import Service from "./Components/Service";
import SuccessFul from "./Components/SuccessFul";
import Summary from "./Components/CheckDetails";
import Payment from "./Components/Payment";
import Invoices from "./Components/Invoices";
import Rewards from "./Components/Rewards";
import Cancel from "./Components/Cancel";
import User from "./Components/Profile";
import Coupons from "./Components/Coupons";
import Order from "./Components/Rides";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer } from "react-toastify";

function App() {
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
          <Route path="/rewards" element={<Rewards />} />
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

export default App;
