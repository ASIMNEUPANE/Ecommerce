require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 3000;

const indexRouter = require("./routes");
mongoose.connect(DB_URL).then(() => {
  console.log("DataBase connected...");
});

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static("public"));



app.use("/", indexRouter);

app.use((err, req, res, next) => {
  const errMsg = err ? err.toString() : "something went wrong";
  res.status(500).json({ data: "", msg: errMsg });
});

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});

// Checkoutpagae cleanup
// Order form => order create in db using order API
// Stripe check for payment completion
// based on stripe answer , update the order status
// seed db reset
