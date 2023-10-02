const multer = require("multer");
const router = require("express").Router();
const controller = require("./product.controller");
const secureAPI = require("../../utils/secure");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/products");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "." + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/",
  secureAPI(["admin"]),
  upload.array("images", 4),
  async (req, res, next) => {
    try {
      if (req.files) {
        req.body.images = [];
        req.files.map((file) =>
          req.body.images.push("products/".concat(file.filename))
        );
      }
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
    const { size, page, name } = req.query;
    const search = { name };
    const result = await controller.list(size, page, search);
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

router.put("/:id", secureAPI(["admin"]),  upload.array("images", 4),async (req, res, next) => {
  try {
    if (req.files) {
      req.body.images = [];
      req.files.map((file) =>
        req.body.images.push("products/".concat(file.filename))
      )}
    
    req.body.updated_by = req.currentUser;
    const result = await controller.updateById(req.params.id, req.body);
    res.json({ data: result, mssg: "Success" });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", secureAPI(["admin"]), async (req, res, next) => {
  try {
    req.body.updated_by = req.currentUser;
    const result = await controller.deleteById(req.params.id);
    res.json({ data: result, mssg: "succes" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
