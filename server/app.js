const express = require("express");
const cors = require("cors");
const flightRoutes = require("./routes/flightRoutes")
const userRoutes = require("./routes/userRoutes")

const app = express();
const port = process.env.PORT || 8080;
app.use(cors());
// parse incoming request from json to object
app.use(express.json())
// flights routes
app.use("/flights", flightRoutes)
app.use("/auth", userRoutes)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  require("./db")
});

