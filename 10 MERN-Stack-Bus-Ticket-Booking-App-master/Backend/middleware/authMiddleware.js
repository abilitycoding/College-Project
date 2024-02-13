const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.send({
        message: "ed",
        success: false
      });
    }
    const decoded = jwt.verify(token, process.env.jwt_secret);

    req.body.userid = decoded.userid;
    next();
  } catch (error) {
    return res.send({
      message: `Auth Failed : ${error.message}`,
      success: false
    });
  }
};
