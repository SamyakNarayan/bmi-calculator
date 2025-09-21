import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const MainPage = ({ setBmiResult, user, isLoggedIn, setIsLoggedIn, setUser }) => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const h = parseFloat(height) / 100; // cm to meters
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      const bmi = (w / (h * h)).toFixed(2);
      setBmiResult(bmi);

      // Only store for non-guest users
      if (user && user !== "Guest") {
        const history = JSON.parse(localStorage.getItem("bmi_history") || "[]");
        history.push({
          username: user,
          height,
          weight,
          bmi,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem("bmi_history", JSON.stringify(history));
      }

      navigate("/result");
    } else {
      alert("Enter valid height and weight.");
    }
  };

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
      <div className="container">
        <h2 className="main-title">Enter Your Details</h2>
        <p style={{ fontWeight: 600, color: "#3949ab", fontSize: "1.15rem" }}>
          Signed in as: {user || "Guest"}
        </p>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={e => setHeight(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            required
          />
          <button type="submit" className="main-btn">Calculate BMI</button>
        </form>
      </div>
    </>
  );
};

export default MainPage;