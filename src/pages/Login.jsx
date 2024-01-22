import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./Login.css"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      const user = userCredential.user;
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Login">
      <div className="intro">
        <h1>Welcome back to our Task Management Platform!</h1>
        <p> Log in to access your personalized task dashboard and continue your journey towards organized and efficient task management. Reconnect with your ongoing tasks, collaborate seamlessly, and stay in control of your workflow. Your productivity journey continues here. Let's make every task count!</p>
      </div>
      <div className="login-f">
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p>
          New user? <Link to="/signup">Register</Link>
        </p>
        <p><Link to="/forgot-pass">Forgot Password</Link></p>
      </div>
    </div>
  );
};

export default Login;
