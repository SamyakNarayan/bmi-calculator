import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";
import ResultPage from "./components/ResultPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [bmiResult, setBmiResult] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage
              setIsLoggedIn={setIsLoggedIn}
              setUser={setUser}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route
          path="/main"
          element={
            <MainPage
              setBmiResult={setBmiResult}
              user={user}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setUser={setUser}
            />
          }
        />
        <Route
          path="/result"
          element={
            bmiResult ? (
              <ResultPage
                bmi={bmiResult}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setUser={setUser}
              />
            ) : (
              <Navigate to="/main" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;