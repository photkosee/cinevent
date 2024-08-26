const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.uid = decoded.uid;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};

const checkAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.uid);

    if (!user || !user.isAdmin) {
      res.status(403).json({
        message: "Access denied: Admins only",
      });
    }

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = { authenticateToken, checkAdmin };
