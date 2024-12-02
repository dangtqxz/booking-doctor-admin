// import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./components/RouteComponents";
import Layout from './components/Layout';
import * as path from "./ultis/path";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import AdminDashboard from "./pages/AdminDashboard";
// import Home from "./pages/Home";
// import Specialties from "./pages/Specialties";
// import SpecialtyDetail from "./pages/SpecialtieDetail";
// import HealthyDetail from "./pages/HealthyDetail";
// import Healthy from "./pages/Healthy";
// import Search from "./pages/Search";
// import Doctors from "./pages/Doctors";
// import Booking from "./pages/Booking";
// import DoctorDetail from "./pages/DoctorDetail";

const useRouteElement = () => {
  return (
    <Routes>
      <Route path={path.PATH_LOGIN} element={<PublicRoute element={<Login />} />} />
      <Route path={path.PATH_FORGOTPASSWORD} element={<PublicRoute element={<ForgotPassword />} />} />

      <Route element={<Layout children={<Outlet />} />}>
        {/* <Route path={path.PATH_HOME} element={<PrivateRoute element={<Home />} />} />
        <Route path={path.PATH_SPECIALTIES} element={<PrivateRoute element={<Specialties />} />} />
        <Route path={path.PATH_SPECIALTY_DETAIL} element={<PrivateRoute element={<SpecialtyDetail />} />} />
        <Route path={path.PATH_HEALTHY} element={<PrivateRoute element={<Healthy />} />} />
        <Route path={path.PATH_HEALTHY_DETAIL} element={<PrivateRoute element={<HealthyDetail />} />} />
        <Route path={path.PATH_DOCTORS} element={<PrivateRoute element={<Doctors />} />} />
        <Route path={path.PATH_DOCTOR_DETAIL} element={<PrivateRoute element={<DoctorDetail />} />} />
        <Route path={path.PATH_APPOINTMENT_BOOKING} element={<PrivateRoute element={<Booking />} />} />
        <Route path={path.PATH_SEARCH} element={<PrivateRoute element={<Search />} />} /> */}
        <Route path={path.PATH_ADMINDASHBOARD} element={<PrivateRoute element={<AdminDashboard />} />} />
      </Route>

      <Route path="*" element={<Navigate to={path.PATH_LOGIN} />} />
    </Routes>
  );
};

export default useRouteElement;
