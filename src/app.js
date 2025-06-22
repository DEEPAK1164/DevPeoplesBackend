const express = require('express');
const app = express();

app.use("/test",(req, res) => {
 
  res.send('Hello, World From Server!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});