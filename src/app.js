const express = require('express');
// Importing the database configuration
require("./config/database");
// Initialize the Express application
const app = express();


const PORT = 7777;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});