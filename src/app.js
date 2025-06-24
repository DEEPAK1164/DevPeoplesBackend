const express = require('express');
const app = express();

// Custom authentication middleware
function authMiddleware(req, res, next) {
  if (req.headers.auth === "secret") {
    next();
  } else {
    res.status(401).send("Unauthorized: Invalid auth header");
  }
}

// Route with try-catch
app.get('/try-catch', (req, res) => {
  try {
    if (!req.query.name) throw new Error("Name query param required!");
    res.send(`Hello, ${req.query.name}`);
  } catch (err) {
    res.status(400).send("Handled by try-catch: " + err.message);
  }
});

// Route that throws an error (handled by error middleware)
app.get('/throw', (req, res) => {
  throw new Error("This error is handled by error middleware!");
});

// Async route with error passed to error handler
app.get('/async', async (req, res, next) => {
  try {
    // Simulate async error
    await Promise.reject(new Error("Async error!"));
  } catch (err) {
    next(err); // Pass error to error handler middleware
  }
});

// Protected route using custom middleware
app.get('/protected', authMiddleware, (req, res) => {
  res.send("You are authorized!");
});

// Error handler middleware (should be last)
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({
    message: "Handled by middleware",
    error: err.message
  });
});

const PORT = 7777;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});