const express = require("express");

const menuRoute = require("./routes/menuRoute");
const typeRoute = require("./routes/typeRoute");

const app = express();

app.use(express.json());

app.use("/api/menu", menuRoute);
app.use("/api/type", typeRoute);

module.exports = app;