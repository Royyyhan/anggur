const db = require("../config/db");

const createPengguna = async (nama, email, hashedPassword) => {
    const [result] = await db.query(
        "INSERT INTO pengguna (nama, email, password) VALUES (?, ?, ?)",
        [nama, email, hashedPassword]
    );
    return result.insertId;
};

const getPenggunaByEmail = async (email) => {
    const [rows] = await db.query("SELECT * FROM pengguna WHERE email = ?", [email]);
    return rows[0];
};

const getAllPengguna = async () => {
    const [rows] = await db.query(
        "SELECT * FROM pengguna ORDER BY id_pengguna ASC"
    );
    // Hapus password dari response
    return rows.map(({ password, ...rest }) => rest);
};

const updatePengguna = async (id, { nama, email, role }) => {
    await db.query(
        "UPDATE pengguna SET nama = ?, email = ?, role = ? WHERE id_pengguna = ?",
        [nama, email, role, id]
    );
};

const deletePengguna = async (id) => {
    await db.query("DELETE FROM pengguna WHERE id_pengguna = ?", [id]);
};

module.exports = {
    createPengguna,
    getPenggunaByEmail,
    getAllPengguna,
    updatePengguna,
    deletePengguna,
};
