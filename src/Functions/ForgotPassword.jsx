import React, { useState } from "react";
import app, { auth, resetpassword } from "../firebase";
import { useNavigate } from "react-router-dom";
// import "./loginsignin.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState(null);

  const handleResetPassword = async () => {
    try {
      await resetpassword(email);
      setResetMessage("Password reset email sent successfully.");
    } catch (error) {
      setResetError(error.message);
    }
  };

  return (
    <div className="signin-page">
      <div className="top">
        <h2>Reset Password</h2>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />
        <button onClick={handleResetPassword}>Reset Password</button>
        {resetMessage && <p className="success-message">{resetMessage}</p>}
        {resetError && <p className="error-message">{resetError}</p>}
        <button onClick={() => navigate("/login")}>Go back to Login</button>
      </div>
    </div>
  );
};

export default ForgotPassword;
