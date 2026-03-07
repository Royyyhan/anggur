const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/adminMiddleware");
const admin = require("../controllers/adminController");

// All routes require auth + admin
router.use(verifyToken, isAdmin);

// Pengguna
router.get("/pengguna", admin.getPengguna);
router.put("/pengguna/:id", admin.editPengguna);
router.delete("/pengguna/:id", admin.hapusPengguna);

// Penyakit
router.get("/penyakit", admin.getPenyakit);
router.post("/penyakit", admin.tambahPenyakit);
router.put("/penyakit/:id", admin.editPenyakit);
router.delete("/penyakit/:id", admin.hapusPenyakit);

// Penanganan
router.get("/penanganan", admin.getPenanganan);
router.post("/penanganan", admin.tambahPenanganan);
router.put("/penanganan/:id", admin.editPenanganan);
router.delete("/penanganan/:id", admin.hapusPenanganan);

// Hasil Deteksi
router.get("/deteksi", admin.getDeteksi);
router.delete("/deteksi/:id", admin.hapusDeteksi);

module.exports = router;
