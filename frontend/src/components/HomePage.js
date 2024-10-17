import React, { useState } from "react";
import "./HomePage.css";

const HomePage = ({ onStartClick }) => {
  return (
    <div className="home-page">
      <h1
        style={{
          color: "#000504",
          fontSize: "50px",
          fontFamily: "Verdana, sans-serif",
          fontWeight: "bold",
        }}
      >
        Welcome to DocInsight
      </h1>
      <h2>Informed Doctor Selection</h2>
      <button className="button" onClick={onStartClick}>
        Start
      </button>
    </div>
  );
};

export default HomePage;
