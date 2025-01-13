const express = require("express");
const cors = require("cors");


const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  console.log("Received request", req.query);
  if (!req.query.upc) {
    res.status(400).send("UPC is required");
    return;
  }
  const upc = req.query.upc;
  const apiUrl = `https://api.upcitemdb.com/prod/trial/lookup?upc=${upc}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
