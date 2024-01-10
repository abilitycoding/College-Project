const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

var mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "Weather-Man"
});

var connection = mongoose.connection;

connection.on("error", console.error.bind(console, "connection error:"));

connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

module.exports = mongoose;