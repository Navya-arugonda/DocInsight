import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DoctorList.css";

const DoctorList = ({ onDoctorSelect }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [options, setOptions] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctors");
        setOptions(response.data);
        const uniqueSpecializations = Array.from(new Set(response.data.map(doctor => doctor.specialization)));
        setSpecializations(uniqueSpecializations);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const showSearchOptions = (event) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
    setSelectedOption(selectedValue);
    if (selectedValue === "specialization") {
      setSelectedDoctor(null); // Reset selected doctor when changing specialization
    }
  };

  const handleDoctorSelect = (event) => {
    const selectedDoctorName = event.target.value;
    const doctor = options.find((doc) => doc.name === selectedDoctorName);
    setSelectedDoctor(doctor);
  };

  const handleGoButtonClick = async () => {
    try {
      if (!selectedValue) {
        console.error("Selected value is undefined");
        return;
      }
      if (selectedOption === "name") {
        const response = await axios.get(
          `http://localhost:5000/api/doctors/name/${selectedValue}`
        );
        if (response.data) {
          onDoctorSelect(response.data);
          navigate(`/doctor-details/${response.data._id}`);
        } else {
          console.error("Doctor not found");
        }
      } else if (selectedOption === "specialization") {
        // Navigate to the URL with the selected doctor name
        const response = await axios.get(
          `http://localhost:5000/api/doctors/name/${selectedDoctor.name}`
        );
        if (response.data) {
          onDoctorSelect(response.data);
          navigate(`/doctor-details/${response.data._id}`);
        } else {
          console.error("Doctor not found");
        }
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  return (
    <div id="search-form">
      <select
        id="primary-search"
        onChange={showSearchOptions}
        value={selectedOption}
      >
        <option value="" disabled>
          Select search option...
        </option>
        <option value="name">Search by Doctor Name</option>
        <option value="specialization">Search by Specialization</option>
      </select>

      {selectedOption === "name" && (
        <select
          id="secondary-search"
          onChange={(event) => setSelectedValue(event.target.value)}
          value={selectedValue}
          disabled={selectedOption !== "name"}
        >
          <option value="" disabled>
            Select doctor name...
          </option>
          {options.map((doctor, index) => (
            <option key={index} value={doctor.name}>
              {doctor.name}
            </option>
          ))}
        </select>
      )}

      {selectedOption === "specialization" && (
        <select
          id="secondary-search"
          onChange={(event) => setSelectedValue(event.target.value)}
          value={selectedValue}
          disabled={selectedOption !== "specialization"}
        >
          <option value="" disabled>
            Select specialization...
          </option>
          {specializations.map((specialization, index) => (
            <option key={index} value={specialization}>
              {specialization}
            </option>
          ))}
        </select>
      )}

      {selectedOption === "specialization" && (
        <select
          id="secondary-search"
          onChange={handleDoctorSelect}
          value={selectedDoctor ? selectedDoctor.name : ""}
          disabled={!selectedValue}
        >
          <option value="" disabled>
            Select doctor name...
          </option>
          {options
            .filter((doctor) => doctor.specialization === selectedValue)
            .map((doctor, index) => (
              <option key={index} value={doctor.name}>
                {doctor.name}
              </option>
            ))}
        </select>
      )}

      <button
        className="button"
        id="go-button"
        onClick={handleGoButtonClick}
        disabled={!selectedValue}
      >
        Go
      </button>
    </div>
  );
};

export default DoctorList;
