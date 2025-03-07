import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [registerAsAdmin, setRegisterAsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const toggleAuthMode = () => setIsRegister(!isRegister);
  const toggleAdminMode = () => setIsAdmin(!isAdmin);
  const toggleRegisterAsAdmin = () => setRegisterAsAdmin(!registerAsAdmin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isRegister && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const endpoint = isRegister
        ? registerAsAdmin
          ? "admin/register"
          : "register"
        : isAdmin
        ? "admin/login"
        : "login";

      const response = await fetch(`https://quiz-3rra.onrender.com/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isRegister
            ? { username, email, password }
            : { username, password }
        ),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message);
      } else {
        alert(data.message);
        if (registerAsAdmin || isAdmin) {
          navigate("/admin-dashboard");
        } else {
          navigate("/AllQuiz", { state: { username } });
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
              {isRegister ? (registerAsAdmin ? "Admin Registration" : "User Registration") : isAdmin ? "Admin Login" : "User Login"}
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
              {isRegister && (
                <div className="form-check mb-3">
                  <input className="form-check-input" type="checkbox" id="registerAsAdmin" checked={registerAsAdmin} onChange={toggleRegisterAsAdmin} />
                  <label className="form-check-label" htmlFor="registerAsAdmin">Register as Admin</label>
                </div>
              )}
              <button type="submit" className="btn btn-primary w-100">{isRegister ? "Sign Up" : "Login"}</button>
            </form>
            <div className="text-center mt-3">
              <button className="btn btn-link text-primary" onClick={toggleAuthMode}>{isRegister ? "Already have an account? Login" : "Don't have an account? Register"}</button>
            </div>
            <div className="text-center mt-2">
              <button className="btn btn-link text-danger" onClick={toggleAdminMode}>{isAdmin ? "Switch to User Login" : "Admin Login"}</button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
