const express = require('express');
const app = express();

app.get('/try-catch', (req, res) => {
  try {
    // Simulate an error
    throw new Error("Error caught by try-catch!");
    res.send("This will not run.");
  } catch (err) {
    res.status(500).send("Handled by try-catch: " + err.message);
  }
});

const PORT = 7777;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});