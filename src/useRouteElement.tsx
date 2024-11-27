import { Route, Routes } from "react-router-dom";
import Booking from "./pages/Booking";
import DoctorDetail from "./pages/DoctorDetail";
import Doctors from "./pages/Doctors";
import Healthy from "./pages/Healthy";
import Home from "./pages/Home";
import SpecialtyDetail from "./pages/SpecialtieDetail";
import Specialties from "./pages/Specialties";
import * as path from "./ultis/path";
import HealthyDetail from "./pages/HealthyDetail";
import Search from "./pages/Search";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import AdminDashboard from "./pages/AdminDashboard";

const useRouteElement = () => {
  return (
    <Routes>
      <Route path={path.PATH_HOME} element={<Home />} />
      <Route path={path.PATH_SPECIALTIES} element={<Specialties />} />
      <Route path={path.PATH_SPECIALTY_DETAIL} element={<SpecialtyDetail />} />
      <Route path={path.PATH_HEALTHY} element={<Healthy />} />
      <Route path={path.PATH_HEALTHY_DETAIL} element={<HealthyDetail />} />
      <Route path={path.PATH_DOCTORS} element={<Doctors />} />
      <Route path={path.PATH_DOCTOR_DETAIL} element={<DoctorDetail />} />
      <Route path={path.PATH_APPOINTMENT_BOOKING} element={<Booking />} />
      <Route path={path.PATH_SEARCH} element={<Search />} />
      <Route path={path.PATH_LOGIN} element={<Login />} />
      <Route path={path.PATH_FORGOTPASSWORD} element={<ForgotPassword />} />
      <Route path={path.PATH_ADMINDASHBOARD} element={<AdminDashboard />} />
    </Routes>
  );
};

export default useRouteElement;
