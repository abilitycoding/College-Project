require("dotenv").config();
const express = require("express");
const {
  createImage,
  shareImage,
  getImage,
  signUp,
  login,
  tokenAuthorization,
  likeImage,
  likedImages
} = require("../functions/controller/tasks");
const serverless = require("serverless-http");
const dbConfig = require("../functions/db/connect");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");

app.use(cors());

PORT = process.env.PORT || 5000;
const BASE_URL = require("../config/index");

app.use(express.json({ limit: "50mb" }));

app.listen(PORT, () => {
  console.log(`server is listening ${PORT}...`);
});

app.post(`/signup`, signUp);
app.post(`/login`, login);
app.post(`/post`, tokenAuthorization, createImage);
app.post(`/share`, shareImage);
app.get(`/get`, getImage);
app.patch(`/:id`, likeImage);
app.get(`/get/:name`, likedImages);
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

// const start = async () => {
//     try {
//         await connectDB()
//         app.listen(PORT, ()=>{
//             console.log("server is listning...")
//         })
//     } catch (error) {
//         console.log("Error in Connecting to DB")
//     }
// }

// start()
const handler = serverless(app);
module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};