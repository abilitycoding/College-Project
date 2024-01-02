const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("./src/configs/db");
const compression = require("compression");
app.use(compression());

const BootCampUserRoute = require("./src/controller/bootcamp.user.controller");
const AdminRoute = require("./src/controller/admin.controller");

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://www.ccschools.in",
      "https://www.lifeblood.com",
      "https://tamil-code-academy-lifeblood.koyeb.app"
    ],
    credentials: true
  })
);
app.use(bodyParser.json());

require("dotenv").config();
const PORT = process.env.PORT || 5000;

/* Router */
app.use("/", BootCampUserRoute);
app.use("/", AdminRoute);

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}!`);
});
