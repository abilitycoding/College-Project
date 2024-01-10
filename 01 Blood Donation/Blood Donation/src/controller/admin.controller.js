const express = require("express");
const router = express.Router();

const AdminModal = require("../model/admin.modal");

const validateSignupData = (req, res, next) => {
  const { userEmail, userPassword } = req.body;
  console.log(req.body);

  if (!userEmail || !userPassword) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields" });
  }
  next();
};

router.post("/signup", validateSignupData, async (req, res) => {
  const { userEmail, userPassword } = req.body;
  console.log(req.body);

  try {
    const existingUser = await AdminModal.findOne({ userEmail });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const user_data = new AdminModal({
      userEmail,
      userPassword
    });

    await user_data.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const validateLoginData = (req, res, next) => {
  const { userEmail, userPassword } = req.body;

  // Check if required fields are present
  if (!userEmail || !userPassword) {
    return res
      .status(400)
      .json({ error: "Please provide both userEmail and password" });
  }

  next();
};

router.post("/login", validateLoginData, async (req, res) => {
  const { userEmail, userPassword } = req.body;
  console.log(req.body);

  try {
    const adminData = await AdminModal.findOne({
      userEmail,
      userPassword
    });

    if (!adminData) {
      return res.status(401).json({ error: "Invalid userEmail or password" });
    }

    res.status(200).json({ userEmail: adminData.userEmail, message: "Login Success" });
  } catch (error) {
    console.error("Error during Login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;