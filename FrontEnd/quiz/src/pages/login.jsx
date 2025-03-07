import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // Email is still required for registration
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const toggleAuthMode = () => setIsRegister(!isRegister);
  const toggleAdminMode = () => setIsAdmin(!isAdmin);

  // console.log(isAdmin)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(
        `http://localhost:5000/api/${isAdmin ? "admin" : isRegister ? "register" : "login"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            isRegister
              ? { username, email, password } // Registration requires email
              : { username, password } // Login now uses username
          ),
        }
      );
      const data = await response.json();
      if (!data.success) {
        setError(data.message);
      } else {
        alert(data.message);
        if (isAdmin) {
          navigate("/admin-dashboard"); // Redirect admin
        } else {
          navigate("/AllQuiz", { state: { username } }); // Redirect normal user
        }
      }
    } catch (error) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-gradient" style={{ background: "linear-gradient(to right, #3b82f6, #9333ea)" }}>
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <div className="card shadow-lg p-4" style={{ width: "24rem", borderRadius: "15px" }}>
          <div className="card-body">
            <h2 className="text-center fw-bold text-dark mb-3">
              {isRegister ? "Register" : isAdmin ? "Admin Login" : "User Login"}
            </h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input type="text" className="form-control" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              {isRegister && (
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
              )}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              {isRegister && (
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
              )}
              <button type="submit" className="btn btn-primary w-100">
                {isRegister ? "Sign Up" : "Login"}
              </button>
            </form>
            <div className="text-center mt-3">
              <button className="btn btn-link text-primary" onClick={toggleAuthMode}>
                {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
              </button>
            </div>
            <div className="text-center mt-2">
              <button className="btn btn-link text-danger" onClick={toggleAdminMode}>
                {isAdmin ? "Switch to User Login" : "Admin Login"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
