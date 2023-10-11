const router = require("express").Router();
const controller = require("./order.controller");
const secureAPI = require("../../utils/secure");

router.post(
  "/",
  

  async (req, res, next) => {
    try {
      req.body.created_by = req.currentUser;
      const result = await controller.create(req.body);
      res.json({ data: result, mssg: "Success" });
    } catch (e) {
      next(e);
    }
  }
);

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

module.exports = router;
