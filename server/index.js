require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.SECRET_KEY);

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL;

const indexRouter = require("./routes");
mongoose.connect(DB_URL).then(() => {
  console.log("DataBase connected...");
});

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static("public"));


app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items:req.body,
    mode: "payment",
    success_url: `${FRONTEND_URL}/checkout/success`,
    cancel_url: `${FRONTEND_URL}/checkout/failed`,
  });

  res.json({ data: session?.url, mssg: "success" });
});

app.use("/", indexRouter);

app.use((err, req, res, next) => {
  const errMsg = err ? err.toString() : "something went wrong";
  res.status(500).json({ data: "", msg: errMsg });
});

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
