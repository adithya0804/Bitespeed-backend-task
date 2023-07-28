const identifyRoute = require("./identify.routes");
const express = require('express');


const router = express.Router();

router.use('/identify', identifyRoute);

module.exports = router;