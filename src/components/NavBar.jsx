import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = ({ isLoggedIn, setIsLoggedIn, setUser }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      setUser("");
    }
    navigate('/');
  };

  return (
    <nav className="navbar">
      <button className="nav-btn" onClick={handleLogin} type="button">Login</button>
    </nav>
  );
};

export default NavBar;