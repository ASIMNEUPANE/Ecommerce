const multer = require("multer");
const router = require("express").Router();
const controller = require("./product.controller");
const secureAPI = require("../../utils/secure");
const AWS = require("aws-sdk");
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/products");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "." + file.originalname;
//     cb(null, uniqueSuffix);
//   },
// });
// export AWS_REGION="ap-southeast-1"
// export AWS_ACCESS_KEY_ID="ASIA5WIQPRZJOFKXTM4N"
// export AWS_SECRET_ACCESS_KEY="Q6yOJfb3wFLd3pyQPLmj6129pRKOz7HJWDQANtuh"
// export AWS_SESSION_TOKEN="IQoJb3JpZ2luX2VjEBgaCmFwLXNvdXRoLTEiSDBGAiEAl4iAsRBnBZSj9jmdGAAUiFG5spc6rl/jC7UTB07IEAICIQDRVlWd0slpzcAv3RLCvi7FpyJH66P6SOwjHpCsDwjdsyqrAghxEAAaDDk0MTE2OTI4MjY0MiIMP/iW4Z8ZMfzAPbVQKogCLbkz68KzXTLUVOt9fdC/31ZVvHYUDrfk5Xj6Djxkdx1MgUPkm4kkU7EWQdeUvUt+5TaIaIFaQyUQfU8J0LR7QXHzsseDr604Xva1JDQ6ZjTn+e2FosuBT228ZHyft15cskeONWuQOWJpGxWXhTlq/BaSB3v2RlWdYgA1T0yI0cLEgdfwBaE2Q3SM99OInP7D9hsfYIquZcfKihBKTs3NIHFwjC2BbsMzHqZtQM0EMUe7grvaCSOd3YHw3xQLLmcmNPZFloDoYagtfVV7y7k4x1LGFz5mYeuEXf9P07mzl/Qh5vs2Nf4Fjok9BLBWyoPHq/IVdaQ16GbFmpNLkkcC4wvchKOC3KJyMMbMhqsGOpwBd/eV3cQzwvg5yLvWPsh8CTstoRxVUw8+mDeKZar6oAtgZfugJdAIcWW2wsmQczc6zMts+f7ddU/6S6j/lFgZKpT7I3NIzu4AJKvY9QopSo9axQlqBIrp1O3XqOYgkubjqIWX3BquqYUKJp737aMRye0EAMGSEBrNudu3FMOhgKL8W98Q1MvNr+XEkZsx4g/1SKWAdvWnDaJo7cBB"
// AWS.config.update({
//   accessKeyId: 'ASIA5WIQPRZJOFKXTM4N',
//   secretAccessKey: 'Q6yOJfb3wFLd3pyQPLmj6129pRKOz7HJWDQANtuh',
//   region: 'ap-southeast-1',
// });
const s3 = new AWS.S3()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limit file size to 5MB
  },
});
// const upload = multer({ storage: storage });

router.post(
  "/",
  secureAPI(["admin"]),
  upload.single('images'),
  async (req, res, next) => {
    try {
      // if (req.files ) {
      //   req.body.images = [];
      //   req.files.map((file) =>
      //     req.body.images.push("products/".concat(file.filename))
      //   );
      // }
      // if (req.body.images && req.body.images.length>0 ) {
      //   req.files = req.body.images
      //   req.body.images=[]
      //   req.files.map((file) =>
      //     req.body.images.push(file)
      //   );
      // }
      const params = {
        Bucket: 'cyclic-dull-lime-sockeye-ap-southeast-1',
        Key: req.file.originalname,
        Body: req.file.buffer,
      };
    
      s3.upload(params, (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error uploading file');
        }
      });
      req.body.created_by = req.currentUser;
      
      const result = await controller.create(req.body);
      res.json({ data: result, msg: "success" });
    } catch (e) {
      next(e);
    }
  }
);

router.get("/", async (req, res, next) => {
  try {
    const { limit, page, name,isArchive } = req.query;
    const search = { name,isArchive };
    const result = await controller.list(limit, page, search);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const result = await controller.getById(req.params.id);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.put(
  "/:id",
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

      req.body.updated_by = req.currentUser;
      const result = await controller.updateById(req.params.id, req.body);
      res.json({ data: result, msg: "success" });
    } catch (e) {
      next(e);
    }
  }
);

router.delete("/:id", secureAPI(["admin"]), async (req, res, next) => {
  try {
    req.body.updated_by = req.currentUser;
    const result = await controller.deleteById(req.params.id, req.body);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
