const mongoose = require("mongoose");

// Define BootCampUserSchema and model
const BootCampUserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phoneNumber: String,
    city: String,
    userType: String,
    isConnected: Boolean
  },
  { timestamps: true }
);

const BootCampUser = mongoose.model("BootCamp-User-Data", BootCampUserSchema);

module.exports = BootCampUser;