const express = require("express");
const ragaCont = require("../controller/ragasController");
const router = express.Router();

router.route("/getRagas").get(ragaCont.getRagas);

module.exports = router;
