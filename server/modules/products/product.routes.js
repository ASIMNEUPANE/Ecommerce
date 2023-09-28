const router = require("express").Router();
const controller = require("./product.controller");
const secureAPI = require('../../utils/secure')

router.post("/", secureAPI(["admin"]), async (req, res, next) => {
  try {
    console.log("product")
    const result = await controller.create(req.body);
    res.json({ data: result, mssg: "Success" });
  } catch (e) {
    next(e);
  }
});

router.get("/", secureAPI(["admin", "user"]),async (req, res, next) => {
  try {
    const result = await controller.list()
    res.json({data:result, mssg:"Success"})
  } catch (e) {
    next(e);
  }
});


router.get('/:id', secureAPI(["admin", "user"]),async (req, res, next) => {
  try {
    const {id}= req.params;
    const result = await controller.getById(id);
    res.json({data:result, mssg:"Success"})
  } catch (e) {
    next(e);
  }
});

router.put("/:id", secureAPI(["admin"]),async (req, res, next) => {
  try {
    const {id}= req.params
    const result = await controller.updateById(id,req.body)
    res.json({data:result, mssg:"Success"})
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", secureAPI(["admin"]),async (req, res, next) => {
  try {
    const {id}= req.params
    const result = await controller.deleteById(id)
    res.json({data:result, mssg:"succes"})
  } catch (e) {
    next(e);
  }
});

module.exports = router;
