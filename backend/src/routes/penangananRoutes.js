const express = require("express");
const router = express.Router();
const penangananController = require("../controllers/penangananController");

router.get("/:id_penyakit", penangananController.showByPenyakit);

module.exports = router;