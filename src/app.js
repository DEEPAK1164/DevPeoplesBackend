const express = require('express');
const app = express();
// Importing the database configuration
const connectDB = require("./config/database");
const UserModel = require("./models/user");

app.post("/signup", async (req, res) => {
  try {
    const userObj = {
      firstName: "Virat",
      lastName: "Kohli",
      emailId: "virat@gmail.com",
      password: "Virat@123"
    };

    // Creating a new user instance using the UserModel
    const user = new UserModel(userObj);
    // Saving the user to the database
    await user.save(); // this will return a promise
    res.send("User created successfully");
  } catch (err) {
    // console.error("Signup error:", err.message);
    res.status(500).send("Error creating user: " + err.message);
  }
});

const PORT = 7777;

connectDB().then(() => {
  console.log('Database connected successfully');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Database connection failed:', err);
});