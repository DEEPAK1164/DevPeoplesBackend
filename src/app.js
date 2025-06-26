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

//delete by id
app.delete("/delete/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    // Deleting the user by ID
    const result = await UserModel.findByIdAndDelete(userId); // <-- Pass the ID string directly
    console.log(result)
    if (result) {
      res.send("User deleted successfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error("Error deleting user:", err.message);
    res.status(500).send("Error deleting user: " + err.message);
  }
})



app.patch("/update/:id", async (req, res) => {
  const userId = req.params?.id;

  try {
    
   // API Level Validations 
   const ALLOWED_UPDATES=["photoUrl","about","gender","age","skills"];
  const isUpdateAllowed = Object.keys(req.body).every((key) => ALLOWED_UPDATES.includes(key));
  const skillsLength = Array.isArray(req.body.skills) ? req.body.skills.length : 0;

if (
  !isUpdateAllowed ||
  skillsLength > 7 ||
  skillsLength < 1
) {
  throw new Error("Invalid update fields, Updates not allowed for these fields");
}

    const result = await UserModel.findByIdAndUpdate(
      userId, // <-- Pass the ID string directly
      req.body,
      { runValidators: true, new: true } // runValidators ensures that the update respects the schema validation rules, new:true returns the updated document
    );
    if (result) {
      res.send("User updated successfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error("Error updating user:", err.message);
    res.status(500).send("Error updating user: " + err.message);
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