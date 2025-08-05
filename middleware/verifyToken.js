const jwt = require("jsonwebtoken");
const httpStatusText = require("../utils/httpsStatusText");
const asyncWrapper = require("../middleware/asyncWrapper");
const verifyToken = async (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader) {
    return res.status(401).json({
      status: httpStatusText.FAILED,
      data: { message: "Please provide token" },
    });
  }
  const token = authHeader.split(" ")[1];
   const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.currentUser = decoded;
  
  console.log("req.currentUser ", req.currentUser);
  console.log("token", token);
  next();
};

module.exports = asyncWrapper(verifyToken);
