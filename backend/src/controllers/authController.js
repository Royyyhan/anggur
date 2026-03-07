const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
    createPengguna,
    getPenggunaByEmail,
} = require("../models/penggunaModel");

const register = async (req, res) => {
    try {
        const { nama, email, password } = req.body;

        if (!nama || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Nama, email, dan password wajib diisi",
            });
        }

        const existingUser = await getPenggunaByEmail(email);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email sudah terdaftar",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const id_pengguna = await createPengguna(nama, email, hashedPassword);

        const token = jwt.sign(
            { id: id_pengguna, nama, email, role: "user" },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({
            success: true,
            message: "Registrasi berhasil",
            data: { id_pengguna, nama, email, role: "user", token },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Registrasi gagal",
            error: error.message,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email dan password wajib diisi",
            });
        }

        const user = await getPenggunaByEmail(email);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Email atau password salah",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Email atau password salah",
            });
        }

        const token = jwt.sign(
            { id: user.id_pengguna, nama: user.nama, email: user.email, role: user.role || "user" },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            success: true,
            message: "Login berhasil",
            data: {
                id_pengguna: user.id_pengguna,
                nama: user.nama,
                email: user.email,
                role: user.role || "user",
                token,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Login gagal",
            error: error.message,
        });
    }
};

module.exports = { register, login };
