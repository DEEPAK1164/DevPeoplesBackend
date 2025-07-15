const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Assuming you have a user model defined in models

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies; // Extracting the token from cookies

    if (!token) {
      return res.status(401).send("Unauthorized, please login first");
    }

    const decodedObj = await jwt.verify(token,process.env.JWT_SECRET);
    const { _id } = decodedObj; // Extracting the user ID from the decoded token
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user; // Attaching the user to the request object
    next(); // Proceed to the next middleware or route handler

  }
  catch (err) {
    console.error("Authentication error:", err.message);
    res.status(401).send("Unauthorized: Invalid or expired token");
  }
}

module.exports = {userAuth};