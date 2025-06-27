const express = require('express');
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
// Importing the database configuration
const connectDB = require("./config/database");
const UserModel = require("./models/user");
const{validateSignUpData} = require("./utils/validation");
const bcrypt=require("bcrypt");
const cookieParser = require('cookie-parser');
app.use(cookieParser()); // Middleware to parse cookies
const jwt=require("jsonwebtoken");

app.post("/signup", async (req, res) => {
  try {
   validateSignUpData(req); // Validate the signup data
   const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hashing the password
   console.log("Hashed Password:", hashedPassword);
    // Creating a new user instance using the UserModel
    const { firstName, lastName, emailId, password} = req.body; // Destructuring with default values
    const user = new UserModel({
      firstName,
      lastName,
      emailId,
      password: hashedPassword, // Storing the hashed password
    });
    // Saving the user to the database
    await user.save(); // this will return a promise
    res.send("User created successfully");
  } catch (err) {
    // console.error("Signup error:", err.message);
    res.status(500).send("Error creating user: " + err.message);
  }
});


app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body; // Using query parameters for login
   
    const user= await UserModel.findOne({ emailId :emailId}); // Find the user by emailId
    if (!user) {
      throw new Error("Invalid Credentials: User not found");
    }
  
     const isPasswordValid=await bcrypt.compare(password, user.password); // Compare the provided password with the hashed password in the database
    if (!isPasswordValid) {
      throw new Error("Invalid Credentials: User not found");
    }

   const jwttoken=jwt.sign({_id: user._id }, "DevPeoples#pyG4XsLkN", { expiresIn: "10s" }); // Generate a JWT token
  
    // If the user is found and the password is valid, send a success response
    res.cookie("token", jwttoken, { httpOnly: true, secure: true }); // Set the token in a cookie
    console.log("Cookie set with token:", jwttoken);
    res.send("Login successful");
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).send("Error during login: " + err.message);
  }
});


app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies; // Extracting the token from cookies
    const decodedMessage = jwt.verify(token, "DevPeoples#pyG4XsLkN");
    console.log("Decoded JWT:", decodedMessage);
    const { _id } = decodedMessage; // Extracting the user ID from the decoded token

    // Find user by id (await the promise)
    const user = await UserModel.findById(_id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    console.error("Profile error:", err.message);
    res.status(401).send("Invalid or expired token");
  }
})




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