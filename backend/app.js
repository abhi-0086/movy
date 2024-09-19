const express = require("express");
const dotenv = require("dotenv");

//load enviroment variables
dotenv.config();

const app = express();

//middleware
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/movies", require("./routes/movieRoute"));

//route for testing
app.get("/", (req, res) => {
  res.send(
    "This is the test route, the API is up an running you can start using the resources!"
  );
});

module.exports = app;
