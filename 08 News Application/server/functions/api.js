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
const bodyParser = require("body-parser");
const User = require("./Models/User");

app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:3000"],
    credentials: true
  })
);

PORT = process.env.PORT || 5000;
const BASE_URL = require("../config/index");

app.use(express.json({ limit: "50mb" }));

app.listen(PORT, () => {
  console.log(`server is listening ${PORT}...`);
});



app.post("/", (req, res) => {
  const { country, category, page, pageSize } = req.body;
  const apiKey = process.env.APIKEY;

  axios
    .get(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.status(400).send(err.response.data);
    });
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
