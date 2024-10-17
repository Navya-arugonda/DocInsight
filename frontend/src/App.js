import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import "./components/HomePage.css";
import DoctorList from "./components/DoctorList";
import DoctorDetails from "./components/DoctorDetails";
import DoctorsPage from "./components/DoctorsPage";
import ReviewPage from "./components/ReviewPage";

function App() {
  const [showSearch, setShowSearch] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleStartClick = () => {
    setShowSearch(true);
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {!showSearch ? (
            <Route
              path="/"
              element={<HomePage onStartClick={handleStartClick} />}
            />
          ) : (
            <Route
              path="/"
              element={<DoctorList onDoctorSelect={handleDoctorSelect} />}
            />
          )}
          <Route
            path="/doctor-list"
            element={<DoctorList onDoctorSelect={handleDoctorSelect} />}
          />
          <Route
            path="/doctor-details/:selectedDoctor"
            element={<DoctorDetails details={selectedDoctor} />}
          />
          <Route path="/doctor-page" element={<DoctorsPage />} />
          <Route path="/reviews/:name" element={<ReviewPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
