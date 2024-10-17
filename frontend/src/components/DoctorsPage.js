// src/components/DoctorsPage.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
  };

  return (
    <div className="container">
      <h1>Doctors List</h1>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor._id} onClick={() => handleDoctorClick(doctor)}>
            {doctor.name}
          </li>
        ))}
      </ul>
      {selectedDoctor && (
        <div className="doctor-details">
          <h2>{selectedDoctor.name}</h2>
          <p>Education: {selectedDoctor.education}</p>
          <p>Certifications: {selectedDoctor.certifications.join(", ")}</p>
          <p>Years of Experience: {selectedDoctor.yearsOfExperience}</p>
          <p>Surgeries Performed: {selectedDoctor.surgeriesPerformed}</p>
          <p>Reviews: {selectedDoctor.reviews}</p>
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;
