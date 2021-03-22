const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
require("dotenv").config();
const routes = require("./routes");

app.use("/", routes);

app.listen(port, () =>
  console.log(`Server is listening at http://localhost:${port}`)
);
