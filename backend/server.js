// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
// mongoose.connect("mongodb+srv://vinaychowdaryv501:Vinay1927@cluster0.xbno9y5.mongodb.net/Doctor", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.connect("mongodb://localhost:27017/doctor_details", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check MongoDB connection status
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("MongoDB connected successfully!");
});

// Define a Doctor model schema
const DoctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  description: String,
  experience: Number,
  education: String,
  contact: String,
  image: String,
  surgicalOutcomes: {
    easy: String,
    medium: String,
    hard: String,
  },
  reviews: [
    {
      userName: String,
      reviewText: String,
      rating: Number,
    },
  ],
});

const Doctor = mongoose.model("Doctor", DoctorSchema);

app.use(bodyParser.json());
app.use(cors());

// Endpoint to fetch all doctors
app.get("/api/doctors", async (req, res) => {
  console.log("Fetching all doctors");
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to fetch details of a specific doctor by name
app.get("/api/doctors/name/:name", async (req, res) => {
  const name = req.params.name;
  console.log(`Fetching doctor by name: ${name}`);
  try {
    const doctor = await Doctor.findOne({ name });
    if (!doctor) {
      res.status(404).json({ message: "Doctor not found" });
    } else {
      res.json(doctor);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to fetch details of a specific doctor by ID
app.get("/api/doctors/id/:id", async (req, res) => {
  const id = req.params.id;
  console.log(`Fetching doctor by ID: ${id}`);
  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      res.status(404).json({ message: "Doctor not found" });
    } else {
      res.json(doctor);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to fetch reviews for a specific doctor by name
app.get("/api/reviews/:name", async (req, res) => {
  const name = req.params.name;
  console.log(`Fetching reviews for doctor: ${name}`);
  try {
    const doctor = await Doctor.findOne({ name });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(doctor.reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to submit a review for a doctor
app.post("/api/reviews", async (req, res) => {
  try {
    // Extract review data from request body
    const { doctorName, userName, reviewText, rating } = req.body;

    // Find the doctor document in the collection
    let doctor = await Doctor.findOne({ name: doctorName });

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Add the new review to the existing reviews array
    doctor.reviews.push({ userName, reviewText, rating });

    // Calculate the average rating
    const totalRatings = doctor.reviews.reduce(
      (acc, curr) => acc + curr.rating,
      0
    );
    const averageRating = totalRatings / doctor.reviews.length;
    doctor.averageRating = averageRating;

    // Save the updated document back to the collection
    await doctor.save();

    res
      .status(201)
      .json({ message: "Review submitted successfully", averageRating });
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
