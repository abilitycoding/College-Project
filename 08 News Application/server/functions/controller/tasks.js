const User = require("../Models/User");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const signUp = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const user = await User.Signup(email, password, name);
    const payload = { email: user.email };
    const access_token = jwt.sign(payload, process.env.SECRET);
    res.status(200).json({ user: user, token: access_token });
  } catch (error) {
    res.status(406).json({ error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.Login(email, password);
    const payload = { email: user.email };
    const access_token = jwt.sign(payload, process.env.SECRET);
    res.status(200).json({ user: user, token: access_token });
  } catch (error) {
    res.status(406).json({ error });
  }
};

const tokenAuthorization = (req, res, next) => {
  const Authtoken = req.headers["x-access-token"];

  jwt.verify(Authtoken, process.env.SECRET, (err, user) => {
    if (err) return res.status(400).send("Invalid Token");
    req.body.user = user;
    next();
  });
};

module.exports = { signUp, login, tokenAuthorization };
