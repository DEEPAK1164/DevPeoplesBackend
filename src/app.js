const express = require('express');
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
// Importing the database configuration
const connectDB = require("./config/database");
const UserModel = require("./models/user");

app.post("/signup", async (req, res) => {
console.log(req.body);
  try {
    // Creating a new user instance using the UserModel
    const user = new UserModel(req.body);
    // Saving the user to the database
    await user.save(); // this will return a promise
    res.send("User created successfully");
  } catch (err) {
    // console.error("Signup error:", err.message);
    res.status(500).send("Error creating user: " + err.message);
  }
});


app.get("/feed", async (req, res) => {
  try {
    // Fetching all users from the database
    const users = await UserModel.find({});
    res.send(users);

   }catch(err){
    console.error("Error fetching users:", err.message);
    res.status(500).send("Error fetching users: " + err.message);
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