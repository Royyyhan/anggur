const db = require("../config/db");

const getPenangananByPenyakitId = async (idPenyakit) => {
    const [rows] = await db.query(
        "SELECT * FROM penanganan WHERE id_penyakit = ? ORDER BY id_penanganan ASC",
        [idPenyakit]
    );
    return rows;
};

const getAllPenanganan = async () => {
    const [rows] = await db.query(`
    SELECT pn.*, p.nama_penyakit 
    FROM penanganan pn
    JOIN penyakit p ON pn.id_penyakit = p.id_penyakit
    ORDER BY pn.id_penanganan ASC
  `);
    return rows;
};

const createPenanganan = async ({ id_penyakit, judul_penanganan, deskripsi_penanganan }) => {
    const [result] = await db.query(
        "INSERT INTO penanganan (id_penyakit, judul_penanganan, deskripsi_penanganan) VALUES (?, ?, ?)",
        [id_penyakit, judul_penanganan, deskripsi_penanganan]
    );
    return result.insertId;
};

const updatePenanganan = async (id, { id_penyakit, judul_penanganan, deskripsi_penanganan }) => {
    await db.query(
        "UPDATE penanganan SET id_penyakit = ?, judul_penanganan = ?, deskripsi_penanganan = ? WHERE id_penanganan = ?",
        [id_penyakit, judul_penanganan, deskripsi_penanganan, id]
    );
};

const deletePenanganan = async (id) => {
    await db.query("DELETE FROM penanganan WHERE id_penanganan = ?", [id]);
};

module.exports = {
    getPenangananByPenyakitId,
    getAllPenanganan,
    createPenanganan,
    updatePenanganan,
    deletePenanganan,
};