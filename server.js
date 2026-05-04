require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("./routes/product");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/product", productRouter);

connectDB();

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
app.get("/api", (req, res) => {
  res.send("hello from simple server :)");
});
