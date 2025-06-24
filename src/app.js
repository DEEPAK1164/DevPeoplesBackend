const express = require('express');
const app = express();

// Importing the database configuration
const connectDB = require("./config/database");

const PORT = 7777;


connectDB().then(() => {
  console.log('Database connected successfully');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Database connection failed:', err);
});