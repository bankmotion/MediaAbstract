import React from "react";
import { Routes, Route } from "react-router-dom";
// import logo from "./logo.svg";
import Home from "./pages/Home/Home";
import Onboarding from "./pages/Onboarding/Onboarding";
import Footer from "./components/Footer/Footer";
import Results from "./pages/Results/Results";
import Terms from "./pages/Terms/Terms";
import Login from "./components/Auth/Login/Login";
import AgenciesSignup from "./components/Auth/Signup/AgenciesSignup/Signup";
import WritersSignup from "./components/Auth/Signup/WritersSignup/Signup";
import NotFound from "./pages/NotFound/NotFound";
import WritersIntro from "./pages/WriterIntro/WriterIntro";
import AgenciesIntro from "./pages/AgenciesIntro/AgenciesIntro";
import WritersDashboard from "./pages/WritersDashboard/WritersDashboard";
import AgenciesDashboard from "./pages/AgenciesDashboard/AgenciesDashboard";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";
import Matches from "./pages/Matches/Matches";
import UserProfile from "./pages/UserProfile/UserProfile";
import Payment from "./pages/Payment/Payment";
import PricingComparison from "./pages/PricingComparison/PricingComparison";

import "./App.css";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/writerintro" element={<WritersIntro />} />
          <Route path="/agenciesintro" element={<AgenciesIntro />} />
          <Route path="/writers/dashboard" element={<WritersDashboard />} />
          <Route path="/agencies/dashboard" element={<AgenciesDashboard />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/results" element={<Results />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup/agencies" element={<AgenciesSignup />} />
          <Route path="/signup/writers" element={<WritersSignup />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route
            path="/pricing-comparison"
            element={<PricingComparison isStandalonePage={true} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
