import { Route, Routes } from "react-router-dom";

import FormBuilder from "./pages/FormBuilder";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage"; // New login page
// import Dashboard from "./pages/Dashboard"; // New dashboard page
import Header from "./components/Header";
import "./App.css";

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        minWidth: "100%",
        backgroundColor: "var(--background)",
        maxHeight: "100vh",
      }}
    >
      <Header />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          flexGrow: 1,
        }}
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/builder/:id" element={<FormBuilder />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
