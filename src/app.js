const express = require('express');
const app = express();

app.get("/user/:userId",(req, res) => {
  res.send(req.params);
});


app.post("/user",(req, res) => {
  res.send("Data saved successfully to DB");
});



app.delete("/user",(req, res) => {
  res.send("Data deleted successfully from DB");
});


const PORT = 7777;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});