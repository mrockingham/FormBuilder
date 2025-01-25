import { Route, Routes } from "react-router-dom";

import FormBuilder from "./pages/FormBuilder";
import LandingPage from "./pages/LandingPage";
import Header from "./components/Header";
import "./App.css";
const App = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // min-h-screen
        minWidth: "100%", // min-w-full
        backgroundColor: "var(--background)", // bg-background
        maxHeight: "100vh", // max-h-screen
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
          <Route path="/builder/:id" element={<FormBuilder />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
