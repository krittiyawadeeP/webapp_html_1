const express = require("express");
const cors = require("cors");

const menuRoute = require("./routes/menuRoute");
const typeRoute = require("./routes/typeRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/menu", menuRoute);
app.use("/api/type", typeRoute);

module.exports = app;