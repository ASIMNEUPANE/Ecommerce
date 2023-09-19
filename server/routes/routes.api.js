const router = require('express').Router()
const routesApi = require("./routes.api");
router.use('/api/v1', routesApi)

module.exports = router;
