const router = require("express").Router();
const controller = require("./category.controller");
const secureAPI = require("../../utils/secure");

router.post("/", secureAPI(["admin"]), async (res, req, next) => {
  try {
    req.body.created_by = req.currentUser;
    const result = await controller.create(req.body);
    res.json({ data: result, mssg: "Sucess" });
  } catch (e) {
    next(e);
  }
});
router.get("/", secureAPI(["admin", "user"]), async (res, req, next) => {
  try {
    const { size, page, name } = req.params;
    const search = { name };
    const result = await controller.list(size, page, search);
    res.json({ data: result, mssg: "Sucess" });
  } catch (e) {
    next(e);
  }
});
router.get("/:id", secureAPI(["admin", "user"]), async (res, req, next) => {
  try {
    const result = await controller.getById(req.params.id);
    res.json({ data: result, mssg: "Sucess" });
  } catch (e) {
    next(e);
  }
});
router.put("/:id", async (res, req, next) => {
  try {
    req.body.updated_by = req.currentUser;
    const result = await controller.updateById(req.params.id, req.body);
    res.json({ data: result, mssg: "Sucess" });
  } catch (e) {
    next(e);
  }
});
router.delete("/:id", async (res, req, next) => {
  try {
    req.body.updated_by = req.currentUser;
    const result = await controller.deleteById(req.params.id, req.body);
    res.json({ data: result, mssg: "Sucess" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
