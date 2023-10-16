require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const stripe = require("stripe")(
  "sk_test_51O0G6BFVTdUImbSsHNBUBgrrV36yrnblLlnCA9ILi1lfHwDlnXqonPlaS5r7SbSgPnxen18LSV1eMjkAvcfU54yF002Ln1v4hc"
);

const DB_URL = process.env.DB_URL;
const indexRouter = require("./routes");
const PORT = process.env.PORT || 3000;

mongoose.connect(DB_URL).then(() => {
  console.log("DataBase connected...");
});

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.post("/create-intent", async (req,res)=>{
  const paymentIntent = await stripe.paymentIntents.create({
    amount:1099,
    currency:"usd",
  });
  res.json({client_secret: paymentIntent.client_secret})
})

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
     line_items:
     [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:5173/checkout/success",
    cancel_url: "http://localhost:5173/checkout/failed",
  });

  res.json({data:session?.url , mssg:'success'});
});

app.use("/", indexRouter);

app.use((err, req, res, next) => {
  const errMsg = err ? err.toString() : "something went wrong";
  res.status(500).json({ data: "", msg: errMsg });
});

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
