
const express = require('express');
const connectDB = require('./config/database'); // Import the database connection
const app = express();
var cookieParser = require('cookie-parser')
const cors = require('cors');
require('dotenv').config();
const http=require("http");

// Middleware (if any)
app.use(express.json()); // Example middleware to handle JSON requests
app.use(cookieParser());
app.use(cors({
  origin:'http://localhost:5173', // Replace with your frontend URL
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}))

const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");
const userRouter=require("./routes/user");
const initializeSocket = require('./utils/socket');
const chatRouter = require('./routes/chat');




app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);
app.use("/",chatRouter);


const server=http.createServer(app);// here app is the existing express application
//so to setup server socket API we need to listen using server.listen not app.listen
//this is the configuration needed for socket

initializeSocket(server);


connectDB().then(()=>{
console.log("DB connected successfully!");
server.listen(process.env.PORT,()=>{
  console.log(`Server is running on port ${process.env.PORT}...`)
})
}).catch((err)=>{
console.error("DB can't be connected");
})