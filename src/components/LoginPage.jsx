import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import { loginUser, registerUser } from "../utils/db";

const LoginPage = ({ setIsLoggedIn, setUser }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await loginUser(loginUsername, loginPassword);
    if (result.success) {
      setIsLoggedIn(true);
      setUser(result.username);
      navigate("/main");
    } else {
      alert(result.error || "Invalid username or password.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!signupUsername || !signupPassword || !signupConfirm) {
      alert("Please fill in all sign up fields.");
      return;
    }
    if (signupPassword !== signupConfirm) {
      alert("Passwords do not match.");
      return;
    }
    
    const result = await registerUser(signupUsername, signupPassword);
    if (result.success) {
      alert(result.message || "Sign up successful! You can now log in.");
    } else {
      alert(result.error || "Error creating account. Please try again.");
      return;
    }
    setActiveTab("login");
    setLoginUsername(signupUsername);
    setLoginPassword("");
    setSignupUsername("");
    setSignupPassword("");
    setSignupConfirm("");
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="tab-group">
          <button
            className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`tab-btn ${activeTab === "signup" ? "active" : ""}`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>
        {activeTab === "login" ? (
          <form onSubmit={handleLogin} className="form">
            <input
              type="text"
              placeholder="Username"
              value={loginUsername}
              onChange={e => setLoginUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={e => setLoginPassword(e.target.value)}
              required
            />
            <button type="submit" className="main-btn">Login</button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="form">
            <input
              type="text"
              placeholder="Username"
              value={signupUsername}
              onChange={e => setSignupUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={signupPassword}
              onChange={e => setSignupPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={signupConfirm}
              onChange={e => setSignupConfirm(e.target.value)}
              required
            />
            <button type="submit" className="main-btn">Sign Up</button>
          </form>
        )}
      </div>
    </>
  );
};

export default LoginPage;