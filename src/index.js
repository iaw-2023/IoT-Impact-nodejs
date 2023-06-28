const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");

//Esto deberia estar para parsear los jsons pero rompe todo
app.use(express.json());

// Enable CORS
app.use(cors());

// Port on which the server listens
const port = 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Welcome route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the main page" });
});

// Routes
app.use("/rest", routes);
