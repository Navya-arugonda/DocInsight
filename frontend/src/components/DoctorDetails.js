import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom"; // Import Link from react-router-dom
import "./DoctorDetails.css";

const DoctorDetails = ({ details }) => {
  const { info } = useParams();
  console.log(info);
  console.log(details);
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

  return (
    <div className="doctor-details-container">
      {/* <h1>Doctor Details</h1> */}
      {details ? (
        <div className="details-box">
          <h1>{details.name}</h1>
          <img
            src="{../doctorImages/details.image}"
            alt="{details.name}"
            className="doctor-photo" // Corrected class attribute to className
          />
          <p>
            <strong>Specialization:</strong> {details.specialization}
          </p>
          <p>
            <strong>Description:</strong> {details.description}
          </p>
          <p>
            <strong>Experience:</strong> {details.experience} years
          </p>
          <p>
            <strong>Education:</strong> {details.education}
          </p>
          <p>
            <strong>Contact:</strong>{" "}
            <a href="tel:{details.contact}">{details.contact}</a>
          </p>
          <h2>Surgical Outcomes Analysis:</h2>
          <p>
            <strong>Easy Surgeries:</strong> {details.surgicalOutcomes.easy}
          </p>
          <p>
            <strong>Medium Surgeries:</strong>{" "}
            {details.surgicalOutcomes.medium}
          </p>
          <p>
            <strong>Hard Surgeries:</strong> {details.surgicalOutcomes.hard}
          </p>
          <Link to={`/reviews/${details.name}`} className="button">
            Review
          </Link>
        </div>
      ) : (
        <p>No details available</p>
      )}
    </div>
  );
};

export default DoctorDetails;
