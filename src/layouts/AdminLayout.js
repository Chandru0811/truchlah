import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideBar from "../pages/admin/SideBar";
import DashboardAdmin from "../pages/DashboardAdmin";
import VehicleManagement from "../pages/VehicleManagement/VehicleManagement";
import VehicleManagementAdd from "../pages/VehicleManagement/VehicleManagementAdd";
import VehicleManagementEdit from "../pages/VehicleManagement/VehicleManagementEdit";
import VehicleManagementView from "../pages/VehicleManagement/VehicleManagementView";
import HouseCategoryManagement from "../pages/HouseCategoryManagent/HouseCategoryManagement";
import HouseCategoryManagementAdd from "../pages/HouseCategoryManagent/HouseCategoryManagementAdd";
import HouseCategoryManagementEdit from "../pages/HouseCategoryManagent/HouseCategoryManagementEdit";
import HouseCategoryManagementView from "../pages/HouseCategoryManagent/HouseCategoryManagementView";
import SupportTeamManagement from "../pages/SupportTeamManagement/SupportTeamManagement";


import SupportTeamManagementAdd from "../pages/SupportTeamManagement/SupportTeamManagementAdd";
import SupportTeamManagementEdit from "../pages/SupportTeamManagement/SupportTeamManagementEdit";
import SupportTeamManagementView from "../pages/SupportTeamManagement/SupportTeamManagementView";
import UserManagement from "../pages/UserManagement/UserManagememnt";
import UserManagementAdd from "../pages/UserManagement/UserManagementAdd";
import UserManagementEdit from "../pages/UserManagement/UserManagementEdit";
import UserManagementView from "../pages/UserManagement/UserManagementView";
import DriverManagement from "../pages/DriverManagement/DriverManagement";
import DriverManagementAdd from "../pages/DriverManagement/DriverManagementAdd";
import DriverManagementEdit from "../pages/DriverManagement/DriverManagementEdit";
import DriverManagementView from "../pages/DriverManagement/DriverManagementView";
import BannerAndOffer from "../pages/BannerAndOffer/BannerAndOffer";
import BannerAndOfferAdd from "../pages/BannerAndOffer/BannerAndOfferAdd";
import BannerAndOfferEdit from "../pages/BannerAndOffer/BannerAndOfferEdit";
import BannerAndOfferView from "../pages/BannerAndOffer/BannerAndOfferView";
import ReviewAndFeedback from "../pages/ReviewAndFeedback";
import ContactForm from "../pages/ContactForm/ContactForm";
import ContactFormEdit from "../pages/ContactForm/ContactFormEdit";
import ContactFormView from "../pages/ContactForm/ContactFormView";
import UserManagementTeam from "../pages/UserManagementTeam/UserManagementTeam";
import UserManagementTeamAdd from "../pages/UserManagementTeam/UserManagementTeamAdd";
import UserManagementTeamEdit from "../pages/UserManagementTeam/UserManagementTeamEdit";
import UserManagementTeamView from "../pages/UserManagementTeam/UserManagementTeamView";
import DriverManagementTeam from "../pages/DriverManagementTeam/DriverManagementTeam";
import DriverManagementTeamAdd from "../pages/DriverManagementTeam/DriverManagementTeamAdd";
import DriverManagementTeamEdit from "../pages/DriverManagementTeam/DriverManagementTeamEdit";
import DriverManagementTeamView from "../pages/DriverManagementTeam/DriverManagementTeamView";
import ReviewAndFeedbackTeam from "../pages/ReviewAndFeedbackTeam";
import ContactFormTeam from "../pages/ContactFormTeam/ContactFormTeam";
import ContactFormTeamEdit from "../pages/ContactFormTeam/ContactFormTeamEdit";
import ContactFormTeamView from "../pages/ContactFormTeam/ContactFormTeamView";

function AdminLayout({ handleLogout }) {
  return (
    <div>
      <BrowserRouter>
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
          <SideBar onLogout={handleLogout} />
          <div className="h-screen flex-grow-1 overflow-y-lg-auto">
            <main className="py-1 bg-surface-secondary" style={{ marginLeft: "15rem" }}>
              <Routes>
                <Route path="/" element={<DashboardAdmin />} />
                <Route path="/vehiclemanagement" element={<VehicleManagement />} />
                <Route path="/vehiclemanagement/add" element={<VehicleManagementAdd />} />
                <Route path="/vehiclemanagement/edit" element={<VehicleManagementEdit />} />
                <Route path="/vehiclemanagement/view" element={<VehicleManagementView />} />

                <Route path="/housecategorymanagement" element={< HouseCategoryManagement />} />
                <Route path="/housecategorymanagement/add" element={< HouseCategoryManagementAdd />} />
                <Route path="/housecategorymanagement/edit" element={< HouseCategoryManagementEdit />} />
                <Route path="/housecategorymanagement/view" element={< HouseCategoryManagementView />} />

                <Route path="/supportteammanagement" element={< SupportTeamManagement />} />
                <Route path="/supportteammanagement/add" element={< SupportTeamManagementAdd />} />
                <Route path="/supportteammanagement/edit" element={< SupportTeamManagementEdit />} />
                <Route path="/supportteammanagement/view" element={< SupportTeamManagementView />} />

                <Route path="/usermanagement" element={< UserManagement />} />
                <Route path="/usermanagement/add" element={< UserManagementAdd />} />
                <Route path="/usermanagement/edit" element={< UserManagementEdit />} />
                <Route path="/usermanagement/view" element={< UserManagementView />} />

                <Route path="/drivermanagement" element={< DriverManagement />} />
                <Route path="/drivermanagement/add" element={< DriverManagementAdd />} />
                <Route path="/drivermanagement/edit" element={< DriverManagementEdit />} />
                <Route path="/drivermanagement/view" element={< DriverManagementView />} />

                <Route path="/bannerandoffer" element={< BannerAndOffer />} />
                <Route path="/bannerandoffer/add" element={< BannerAndOfferAdd />} />
                <Route path="/bannerandoffer/edit" element={< BannerAndOfferEdit />} />
                <Route path="/bannerandoffer/view" element={< BannerAndOfferView />} />

                <Route path="/reviewandfeedback" element={< ReviewAndFeedback />} />

                <Route path="/contactform" element={< ContactForm />} />
                <Route path="/contactform/edit" element={< ContactFormEdit />} />
                <Route path="/contactform/view" element={< ContactFormView />} />

                {/* Support Team */}
                <Route path="/usermanagementteam" element={< UserManagementTeam />} />
                <Route path="/usermanagementteam/add" element={< UserManagementTeamAdd />} />
                <Route path="/usermanagementteam/edit" element={< UserManagementTeamEdit />} />
                <Route path="/usermanagementteam/view" element={< UserManagementTeamView />} />

                <Route path="/drivermanagementteam" element={< DriverManagementTeam />} />
                <Route path="/drivermanagementteam/add" element={< DriverManagementTeamAdd />} />
                <Route path="/drivermanagementteam/edit" element={< DriverManagementTeamEdit />} />
                <Route path="/drivermanagementteam/view" element={< DriverManagementTeamView />} />


                <Route path="/reviewandfeedbackteam" element={< ReviewAndFeedbackTeam />} />

                <Route path="/contactformteam" element={< ContactFormTeam />} />
                <Route path="/contactformteam/edit" element={< ContactFormTeamEdit />} />
                <Route path="/contactformteam/view" element={< ContactFormTeamView />} />



              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default AdminLayout;
