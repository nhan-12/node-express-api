const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// MongoDB Cluster Username: nathan0713
// MongoDB Cluster PW: IAVHNsyoMyvaH7Nb

app.get('/', (req, res) => {
  res.send("Hello from Node API Server");
});

mongoose.connect("mongodb+srv://nathan0713:IAVHNsyoMyvaH7Nb@cluster0.v5gvadm.mongodb.net/Node-Express-API")
.then(() => {
  console.log("Connected to database!");
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  });
})
.catch(() => {
  console.log("Connection failed");
});
