const express = require("express");
const router = require("express").Router();

const controller = require("./order.controller");
const secureAPI = require("../../utils/secure");
const FRONTEND_URL = process.env.FRONTEND_URL;
const stripe = require("stripe")(process.env.SECRET_KEY);
const endpointSecret=process.env.ENDPOINT_SECRET

router.post("/", async (req, res, next) => {
  try {
    const result = await controller.create(req.body);
    res.json({ data: result, mssg: "Success" });
  } catch (e) {
    next(e);
  }
});

router.get("/", secureAPI(["admin", "user"]), async (req, res, next) => {
  try {
    const { limit, page, id } = req.query;
    const search = { id };
    const result = await controller.list(limit, page, search);
    res.json({ data: result, mssg: "Success" });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", secureAPI(["admin", "user"]), async (req, res, next) => {
  try {
    const result = await controller.getById(req.params.id);
    res.json({ data: result, mssg: "Success" });
  } catch (e) {
    next(e);
  }
});

router.put("/:id", secureAPI(["admin"]), async (req, res, next) => {
  try {
    req.body.updated_by = req.currentUser;
    req.body.updated_at = new Date.now();
    const result = await controller.updateById(req.params.id, req.body);
    res.json({ data: result, mssg: "Success" });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", secureAPI(["admin"]), async (req, res, next) => {
  try {
    req.body.updated_by = req.currentUser;
    req.body.updated_at = new Date();

    const result = await controller.deleteById(req.params.id, req.body);
    res.json({ data: result, mssg: "succes" });
  } catch (e) {
    next(e);
  }
});

router.post("/create-checkout-session", async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body,
      mode: "payment",
      success_url: `${FRONTEND_URL}/checkout/success`,
      cancel_url: `${FRONTEND_URL}/checkout/failed`,
    });

    res.json({ data: { id: session.id, url: session.url }, mssg: "success" });
  } catch (e) {
    next(e);
  }
});

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    

    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        endpointSecret
      );
      switch (event.type) {
        case "checkout.session.async_payment_failed":
          const payment_failed = event.data.object;
          await controller.updateBasedonPayment(payment_failed);
          break;
        case "checkout.session.async_payment_succeeded":
          const payment_succeeded = event.data.object;
          await controller.updateBasedonPayment(payment_succeeded);

          break;
        case "checkout.session.async_payment_completed":
          const payment_completed = event.data.object;
          await controller.updateBasedonPayment(payment_completed);
          break;
        case "checkout.session.async_payment_expired":
          const payment_expired = event.data.object;
          await controller.updateBasedonPayment(payment_expired);

          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    res.send();
  }
);

module.exports = router;
