import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase";
import "./Signup.css"

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send verification email
      await sendEmailVerification(user);

      alert("Verification email sent successfully.");

      // Other signup logic
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Singin">
      <div className="intro-s">
        <h1>Welcome to our Task Management Platform!</h1> 
        <p>Sign up now to unlock a world of efficient task organization and collaboration. Join our community and experience a streamlined approach to managing your daily tasks. Start your journey towards enhanced productivity and seamless teamwork. Let's turn your tasks into accomplishments together!</p>
      </div>
      <div className="signin-f">
        <h1>Signup Page</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="email"
            placeholder="Your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="signup-button">
            Signup
          </button>
        </form>
      <p>
        Already a user? <Link to="/login">Login</Link>
      </p>
      </div>
    </div>
  );
};

export default Signup;
