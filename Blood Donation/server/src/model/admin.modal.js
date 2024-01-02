const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    userEmail: String,
    userPassword: String,
  },
  { timestamps: true }
);

const AdminModal = mongoose.model("Admin", AdminSchema);

module.exports = AdminModal;