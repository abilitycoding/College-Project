require("dotenv").config();
const express = require("express");
const {
  signUp,
  login,
  tokenAuthorization
} = require("../functions/controller/tasks");
const serverless = require("serverless-http");
const dbConfig = require("../functions/db/connect");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const axios = require("axios");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const User = require("./Models/User");

app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:3000"],
    credentials: true
  })
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ccschools.edu@gmail.com",
    pass: "qyzp wbnv lbuu rvza"
  }
});

PORT = process.env.PORT || 5000;
const BASE_URL = require("../config/index");

app.use(express.json({ limit: "50mb" }));

app.listen(PORT, () => {
  console.log(`server is listening ${PORT}...`);
});

app.post("/alerts", async (req, res) => {
  const { district } = req.body;

  try {
    // Find users with the specified location
    const usersInDistrict = await User.find({ location: district });

    // Send alerts to each user
    for (const user of usersInDistrict) {
      const mailOptions = {
        from: "tnweather@gmail.com",
        to: user.email,
        subject: `Alert for ${district}`,
        text: `Weather alert for ${district}: Cyclone warning. Stay safe and ensure you have enough food and safety items for the next week.`
      };

      await transporter.sendMail(mailOptions);
      console.log(
        `Alert email for ${district} sent successfully to ${user.email}`
      );
    }

    res
      .status(200)
      .json({
        message: `Alert for ${district} sent successfully to users in the specified location!`
      });
  } catch (error) {
    console.error("Error sending alerts:", error);
    res.status(500).json({ error: "Error sending alerts. Please try again." });
  }
});

app.get("/api/weather/:city", async (req, res) => {
  const city = req.params.city;
  https: try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=2c17c00071cd69e88083ef7d40a5b8e5`
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post(`/signup`, signUp);
app.post(`/login`, login);
app.post(`/Authorize`, (req, res) => {
  const Authtoken = req.headers["x-access-token"];

  jwt.verify(Authtoken, process.env.SECRET, (err, user) => {
    if (err) return res.status(400).json({ err: "Invalid token" });
    return res.status(200).json({ msg: "Authorized" });
  });
});
app.get(`${BASE_URL}/`, (req, res) => {
  res.send("Server is Running...");
});

const handler = serverless(app);
module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
