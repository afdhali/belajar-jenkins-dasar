// index.js
const express = require("express");
const app = express();
const port = 49000;

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
