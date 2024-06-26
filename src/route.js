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
// import Maps from "./pages/item_shift/Map";
import Shift from "./pages/Shift";
// import Shift from "./pages/Algorithm/AlgorithmSteps";
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
import ShiftPack from "./Components/home/ShiftPack";
import About from "./Components/home/about";
import ContactUs from "./Components/home/ContactUs";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import TermsCondition from "./pages/TermsCondition";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Wallet from "./pages/profile/Wallet";
import Notification from "./pages/profile/Notification";
import Invoice from "./pages/profile/invoice";
import Support from "./pages/profile/Support";
import Refer from "./pages/profile/Refer&Earn";
import Map from "./pages/item_shift/Map";
// import MapCopy from "./pages/item_shift/Map copy";
import Priceing from "./pages/Priceing";
import { useEffect, useState } from "react";
// import axios from "axios";
import { bookingApi, userApi } from "./config/URL";
import Price from "./pages/Price";
import RideDetailsView from "./pages/profile/RideDetailsView";
import Popup from "./pages/profile/Popup";
// import MapCopy from "./pages/item_shift/Map copy";
import ChangePassword from "./pages/authorization/ChangePassword";

function UserRoute() {
  AOS.init({
    duration: 800,
    delay: 200,
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const token = sessionStorage.getItem("token");

  const handleLogin = () => {
    sessionStorage.setItem("isAdmin", true);
    setIsAdmin(true);
  };

  const handleLogout = async () => {
    const payload = {
      jwtToken: token,
    };
    try {
      const response = await userApi.post(`user/logout`, payload);
      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log("Error");
    }

    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("roles");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("isAdmin");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("shiftType");
    setIsAdmin(false);
  };

  useEffect(() => {
    const isAdminFromStorage = sessionStorage.getItem("isAdmin");
    const isAdminBoolean = isAdminFromStorage === "true";
    if (isAdmin !== isAdminBoolean) {
      setIsAdmin(isAdminBoolean);
    }

    const responseInterceptor = (error) => {
      console.log("Error is", error);
      if (error.response?.status === 401) {
        toast.warning("Session Expired!! Please Login");
        handleLogout();
      }
      return Promise.reject(error);
    };

    // Add the interceptor to both APIs
    const bookingInterceptor = bookingApi.interceptors.response.use(
      (response) => response,
      responseInterceptor
    );
    const userInterceptor = userApi.interceptors.response.use(
      (response) => response,
      responseInterceptor
    );

    return () => {
      bookingApi.interceptors.response.eject(bookingInterceptor);
      userApi.interceptors.response.eject(userInterceptor);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  return (
    <Router>
      <ToastContainer />
      <Head isAdmin={isAdmin} handleLogout={handleLogout} />
      <div style={{ marginTop: "88px" }}>
        <Routes>
          <Route path="/" element={<Home isAdmin={isAdmin} />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route
            path="/register"
            element={<Register handleLogin={handleLogin} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/ShiftPack" element={<ShiftPack />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/forgetpassword" element={<ForgotPassword />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/termsandcondition" element={<TermsCondition />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/pricing" element={<Priceing />} />
          {isAdmin && (
            <>
              <Route path="/map" element={<Map />} />
              {/* <Route path="/mapcopy" element={<MapCopy />} /> */}
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/support" element={<Support />} />
              <Route path="/referearn" element={<Refer />} />
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/shift" element={<Shift />} />
              <Route path="/houseshift" element={<HouseShift />} />
              <Route path="/confirmlocation" element={<ConfirmLocation />} />
              <Route path="/service" element={<Service />} />
              <Route path="/successful" element={<SuccessFul />} />
              <Route path="/summary/:bookingId" element={<Summary />} />
              <Route path="/payments" element={<Payment />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/cancelorder" element={<Cancel />} />
              <Route path="/user" element={<User />} />
              <Route path="/rides" element={<Order />} />
              <Route path="/coupons" element={<Coupons />} />
              <Route path="/price" element={<Price />} />
              <Route
                path="/ridedetailsview/:id"
                element={<RideDetailsView />}
              />
              <Route path="/popup" element={<Popup />} />
              <Route path="/changepassword" element={<ChangePassword />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <BackToTopButton />
      <Foot isAdmin={isAdmin} />
    </Router>
  );
}

export default UserRoute;
