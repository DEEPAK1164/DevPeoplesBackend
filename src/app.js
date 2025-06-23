const express = require('express');
const app = express();
const {adminAuth}=require("./middlewares/auth");

app.get("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
  res.send("Admin data retrieved successfully!");
});

app.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});

const PORT = 7777;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});