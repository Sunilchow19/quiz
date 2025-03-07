import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz from "./pages/quizPage";
import AllQuiz from "./pages/allQuizes";
import AuthPage from "./pages/login";
import AdminDashboard from "./pages/AdminDash";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // Load dark mode preference from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Toggle dark mode and save it
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-dark", "text-white");
    } else {
      document.body.classList.remove("bg-dark", "text-white");
    }
  }, [darkMode]);

  return (
    <>
    <BrowserRouter>
      <div className="container mt-3">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Quiz App</h1>
          <button className="btn btn-outline-info" onClick={toggleDarkMode}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/AllQuiz" element={<AllQuiz />} />
          <Route path="/Quiz" element={<Quiz />} />
        </Routes>
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;
