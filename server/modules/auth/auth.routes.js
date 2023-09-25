const router = require("express").Router();
const controller = require("./auth.controller");

router.post("/register", async (req, res, next) => {
  try {
    const result = await controller.register(req.body);
    res.json({ data: result, msg: "Succes" });
  } catch (e) {
    next(e);
  }
});

router.post("/verify", async (req, res, next) => {
  try {
    const { email, token } = req.body;
    if (!email || !token) throw new Error("Email or token is missing");
    result = await controller.verifyEmail(email, token);
    res.json({ data: result, msg: "Succes" });
  } catch (e) {
    next(e);
  }
});

router.post("/regenerate", async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) throw new Error("Email  is missing");
    result = await controller.regenerateToken(email);
    res.json({ data: result, msg: "Succes" });
  } catch (e) {
    next(e);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("Email or Password is missing");
    result = await controller.login(email, password);
    res.json({ data: result, msg: "Succes" });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    result = await controller.deleteById(req.params);
    res.json({ data: result, mssg: "Succes" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
