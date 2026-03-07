const { getAllPengguna, updatePengguna, deletePengguna } = require("../models/penggunaModel");
const { getAllPenyakit, createPenyakit, updatePenyakit, deletePenyakit } = require("../models/penyakitModel");
const { getAllPenanganan, createPenanganan, updatePenanganan, deletePenanganan } = require("../models/penangananModel");
const { getAllHasilDeteksi, deleteHasilDeteksi } = require("../models/hasilDeteksiModel");

// ============ PENGGUNA ============
const getPengguna = async (req, res) => {
    try {
        const data = await getAllPengguna();
        res.json({ success: true, data });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

const editPengguna = async (req, res) => {
    try {
        await updatePengguna(req.params.id, req.body);
        res.json({ success: true, message: "Pengguna berhasil diupdate" });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

const hapusPengguna = async (req, res) => {
    try {
        await deletePengguna(req.params.id);
        res.json({ success: true, message: "Pengguna berhasil dihapus" });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

// ============ PENYAKIT ============
const getPenyakit = async (req, res) => {
    try {
        const data = await getAllPenyakit();
        res.json({ success: true, data });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

const tambahPenyakit = async (req, res) => {
    try {
        const id = await createPenyakit(req.body);
        res.status(201).json({ success: true, message: "Penyakit berhasil ditambahkan", data: { id } });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

const editPenyakit = async (req, res) => {
    try {
        await updatePenyakit(req.params.id, req.body);
        res.json({ success: true, message: "Penyakit berhasil diupdate" });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

const hapusPenyakit = async (req, res) => {
    try {
        await deletePenyakit(req.params.id);
        res.json({ success: true, message: "Penyakit berhasil dihapus" });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

// ============ PENANGANAN ============
const getPenanganan = async (req, res) => {
    try {
        const data = await getAllPenanganan();
        res.json({ success: true, data });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

const tambahPenanganan = async (req, res) => {
    try {
        const id = await createPenanganan(req.body);
        res.status(201).json({ success: true, message: "Penanganan berhasil ditambahkan", data: { id } });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

const editPenanganan = async (req, res) => {
    try {
        await updatePenanganan(req.params.id, req.body);
        res.json({ success: true, message: "Penanganan berhasil diupdate" });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

const hapusPenanganan = async (req, res) => {
    try {
        await deletePenanganan(req.params.id);
        res.json({ success: true, message: "Penanganan berhasil dihapus" });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

// ============ HASIL DETEKSI ============
const getDeteksi = async (req, res) => {
    try {
        const data = await getAllHasilDeteksi();
        res.json({ success: true, data });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

const hapusDeteksi = async (req, res) => {
    try {
        await deleteHasilDeteksi(req.params.id);
        res.json({ success: true, message: "Hasil deteksi berhasil dihapus" });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

module.exports = {
    getPengguna, editPengguna, hapusPengguna,
    getPenyakit, tambahPenyakit, editPenyakit, hapusPenyakit,
    getPenanganan, tambahPenanganan, editPenanganan, hapusPenanganan,
    getDeteksi, hapusDeteksi,
};
