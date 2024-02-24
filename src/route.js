import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import ShiftPack from "./Components/home/ShiftPack";
import About from "./Components/home/about";
import ContactUs from "./Components/home/ContactUs";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer } from "react-toastify";
import TermsCondition from "./pages/TermsCondition";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function UserRoute() {
  AOS.init({
    duration: 800,
    delay: 200,
  });

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={<AppLayout><Home /></AppLayout>}
        />
        <Route path="/login" element={<AppLayout><Login /></AppLayout>} />
        <Route path="/register" element={<AppLayout><Register /></AppLayout>} />
        <Route path="/ShiftPack" element={<AppLayout><ShiftPack /></AppLayout>} />
        <Route path="/about" element={<AppLayout><About /></AppLayout>} />
        <Route path="/contact" element={<AppLayout><ContactUs /></AppLayout>} />
        <Route path="/forgetpassword" element={<AppLayout><ForgotPassword /></AppLayout>} />
        <Route path="/otp" element={<AppLayout><OTP /></AppLayout>} />
        <Route path="/map" element={<AppLayout><Maps /></AppLayout>} />
        <Route path="/shift" element={<AppLayout><Shift /></AppLayout>} />
        <Route path="/houseshift" element={<AppLayout><HouseShift /></AppLayout>} />
        <Route path="/confirmlocation" element={<AppLayout><ConfirmLocation /></AppLayout>} />
        <Route path="/service" element={<AppLayout><Service /></AppLayout>} />
        <Route path="/successful" element={<AppLayout><SuccessFul /></AppLayout>} />
        <Route path="/summary" element={<AppLayout><Summary /></AppLayout>} />
        <Route path="/payments" element={<AppLayout><Payment /></AppLayout>} />
        <Route path="/invoice" element={<AppLayout><Invoices /></AppLayout>} />
        <Route path="/cancelorder" element={<AppLayout><Cancel /></AppLayout>} />
        <Route path="/user" element={<AppLayout><User /></AppLayout>} />
        <Route path="/rides" element={<AppLayout><Order /></AppLayout>} />
        <Route path="/coupons" element={<AppLayout><Coupons /></AppLayout>} />
        <Route path="/termsandcondition" element={<TermsCondition />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function AppLayout({ children }) {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/termsandcondition" || location.pathname === "/privacypolicy";

  return (
    <>
      {!hideHeaderFooter && <Head />}
      <div className="content">{children}</div>
      {!hideHeaderFooter && <BackToTopButton />}
      {!hideHeaderFooter && <Foot />}
    </>
  );
}

export default UserRoute;
