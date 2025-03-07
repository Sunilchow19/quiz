import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    axios
      .get("https://quiz-3rra.onrender.com/api/scores")
      .then((res) => setScores(res.data))
      .catch((err) => console.error("Error fetching scores:", err));
  }, []);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-dark text-white">
      <h1 className="mb-4">Admin Dashboard</h1>
      <p>Welcome, Admin! You have successfully logged in.</p>

      <div className="table-responsive mt-4">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Score</th>
              <th>Topic</th>
            </tr>
          </thead>
          <tbody>
            {scores.length > 0 ? (
              scores.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.score}</td>
                  <td>{user.topic}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No scores available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
