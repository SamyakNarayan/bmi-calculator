import React from "react";
import Navbar from "./NavBar";

const ResultPage = ({ bmi }) => {
  const getStatus = (bmi) => {
    const num = parseFloat(bmi);
    if (num < 18.5) return "Underweight";
    if (num < 24.9) return "Normal weight";
    if (num < 29.9) return "Overweight";
    return "Obese";
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="main-title">Your BMI Result</h2>
        <div className="result">
          <p className="bmi-value">BMI: <strong>{bmi}</strong></p>
          <p className="bmi-status">Status: <strong>{getStatus(bmi)}</strong></p>
        </div>
        <h3 className="thank-you">Thank you for using the BMI Calculator!</h3>
      </div>
    </>
  );
};

export default ResultPage;