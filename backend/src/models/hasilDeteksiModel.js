const db = require("../config/db");

const createHasilDeteksi = async ({ id_pengguna, id_penyakit, gambar_upload, tingkat_keyakinan }) => {
    const [result] = await db.query(
        `INSERT INTO hasil_deteksi (id_pengguna, id_penyakit, gambar_upload, tingkat_keyakinan)
     VALUES (?, ?, ?, ?)`,
        [id_pengguna || null, id_penyakit, gambar_upload, tingkat_keyakinan]
    );
    return result.insertId;
};

const getRiwayatDeteksi = async (id_pengguna) => {
    const [rows] = await db.query(`
    SELECT hd.id_deteksi, hd.gambar_upload, hd.tingkat_keyakinan, hd.tanggal_deteksi, p.nama_penyakit
    FROM hasil_deteksi hd
    JOIN penyakit p ON hd.id_penyakit = p.id_penyakit
    WHERE hd.id_pengguna = ?
    ORDER BY hd.tanggal_deteksi DESC
  `, [id_pengguna]);
    return rows;
};

const getDeteksiById = async (id) => {
    const [rows] = await db.query(`
    SELECT hd.id_deteksi, hd.gambar_upload, hd.tingkat_keyakinan, hd.tanggal_deteksi,
           p.id_penyakit, p.nama_penyakit, p.deskripsi, p.penyebab, p.gambar_contoh
    FROM hasil_deteksi hd
    JOIN penyakit p ON hd.id_penyakit = p.id_penyakit
    WHERE hd.id_deteksi = ?
  `, [id]);
    return rows[0];
};

const getAllHasilDeteksi = async () => {
    const [rows] = await db.query(`
    SELECT hd.id_deteksi, hd.gambar_upload, hd.tingkat_keyakinan, hd.tanggal_deteksi,
           p.nama_penyakit, pg.nama AS nama_pengguna, pg.email
    FROM hasil_deteksi hd
    JOIN penyakit p ON hd.id_penyakit = p.id_penyakit
    LEFT JOIN pengguna pg ON hd.id_pengguna = pg.id_pengguna
    ORDER BY hd.tanggal_deteksi DESC
  `);
    return rows;
};

const deleteHasilDeteksi = async (id) => {
    await db.query("DELETE FROM hasil_deteksi WHERE id_deteksi = ?", [id]);
};

module.exports = {
    createHasilDeteksi,
    getRiwayatDeteksi,
    getDeteksiById,
    getAllHasilDeteksi,
    deleteHasilDeteksi,
};