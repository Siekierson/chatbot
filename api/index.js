const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
require("dotenv").config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("db connect");
});

const routes = require("./routes");

app.use("/", routes);

app.listen(port, () =>
  console.log(`Server is listening at http://localhost:${port}`)
);
