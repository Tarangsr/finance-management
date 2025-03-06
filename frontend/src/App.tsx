import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import HomePage from "./pages/homepage";
import Records from "./pages/records";
import Analysis from "./pages/analysis";
import Budgets from "./pages/budgets";
import Accounts from "./pages/accounts";
import Categories from "./pages/categories";
import Profile from "./pages/profile";
import ContactUs from "./pages/contact";
import TermsOfService from "./pages/terms";
import PrivacyPolicy from "./pages/privacy";
import Login from "./pages/login";
import Register from "./pages/register";
import "./App.css";
import VerifyOTP from "./pages/verifyotp";
import Features from "./pages/features";

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  console.log(isLoggedIn);
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);
  return (
    <div className="flex h-screen flex-col">
      {!isAuthPage && (
        <>
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          {!isSidebarOpen && <Navbar />}
        </>
      )}

      <div className="flex-1 flex flex-col">
        <div className="p-4 overflow-auto flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/records" element={<Records />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify_otp" element={<VerifyOTP />} />
            <Route path="/register" element={<Register />} />
            <Route path="/features" element={<Features />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {!isAuthPage && <Footer />}
      </div>
    </div>
  );
};

const WrappedApp: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
