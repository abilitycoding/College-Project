const mongoose = require("mongoose");

// Define BootCampUserSchema and model
const BootCampUserSchema = new mongoose.Schema(
  {
    name: String,
    phoneNumber: String,
    city: String,
    bloodType: String
  },
  { timestamps: true }
);

const BootCampUser = mongoose.model("BootCamp-User-Data", BootCampUserSchema);

module.exports = BootCampUser;
