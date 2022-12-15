const express = require("express");
const ragaCont = require("./../controller/ragasController");
const diseaseCont = require("./../controller/diseaseController");
const router = express.Router();

router.route("/getRagas").get(ragaCont.getRagas);
router.route("/getdisease").get(diseaseCont.getdisease);

module.exports = router;
