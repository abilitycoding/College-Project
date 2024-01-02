const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect("mongodb+srv://tamilcodingacademy:7Yhy6Y5SirrGvimK@cluster0.nhkhoat.mongodb.net/CollegeProject", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "BloodDonation" 
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = db; // Export the mongoose connection object
