import React from "react";
import { Routes, Route } from "react-router-dom";
// import logo from "./logo.svg";
import Home from "./pages/Home/Home";
import Onboarding from "./pages/Onboarding/Onboarding";
import Footer from "./components/Tabs/Footer/Footer";
import Results from "./pages/Results/Results";
import Terms from "./pages/Terms/Terms";
import Login from "./components/Auth/Login/Login";
import Signup from "./components/Auth/Signup/Signup";
import NotFound from "./pages/NotFound/NotFound";
import WritersIntro from "./pages/WriterIntro/WriterIntro";
import AgenciesIntro from "./pages/AgenciesIntro/AgenciesIntro";

import "./App.css";

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/writerintro" element={<WritersIntro />} />
          <Route path="/agenciesintro" element={<AgenciesIntro />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/results" element={<Results />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
