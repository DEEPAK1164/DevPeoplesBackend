const express = require('express');
const app = express();

app.get("/", (req, res) => {
  throw new Error("An unexpected error occurred!");
  res.send("Hello, World!");
})

app.use((err, req, res, next) => {
  console.error(err.message);
 res.status(500).send(`Something went wrong! Please try again later. Error: ${err.message}`);
})

const PORT = 7777;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});