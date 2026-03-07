const express = require("express");
const router = express.Router();
const penyakitController = require("../controllers/penyakitController");

router.get("/", penyakitController.index);
router.get("/:id", penyakitController.show);

module.exports = router;