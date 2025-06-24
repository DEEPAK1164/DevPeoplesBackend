const express = require('express');
const app = express();

app.get('/', (req, res) => {
  // Simulate an error (no try-catch here)
  throw new Error("Error caught by middleware!");
  res.send("This will not run.");
});

// Error handler middleware (should be last)
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send("Handled by middleware: " + err.message);
});

const PORT = 7777;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});