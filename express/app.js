const express = require("express");
const RagaRoutes = require("./routes/ragasRouter");
const app = express();

app.use(express.json());

app.get("/api", RagaRoutes);

module.exports = app;
