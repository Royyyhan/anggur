import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/api";

function RegisterPage() {
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!nama || !email || !password) { setError("Semua field wajib diisi"); return; }
        if (password.length < 6) { setError("Password minimal 6 karakter"); return; }
        try {
            setLoading(true);
            const result = await registerUser(nama, email, password);
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("user", JSON.stringify({
                id: result.data.id_pengguna, nama: result.data.nama,
                email: result.data.email, role: result.data.role || "user",
            }));
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Registrasi gagal");
        } finally { setLoading(false); }
    };

    return (
        <div style={s.page}>
            <div style={s.card}>
                <h1 style={s.title}>Buat Akun</h1>
                <p style={s.subtitle}>Daftar untuk mulai menggunakan AgroScan</p>

                <form onSubmit={handleSubmit} style={s.form}>
                    {error && <div style={s.error}>{error}</div>}
                    <div style={s.group}>
                        <label style={s.label}>Nama Lengkap</label>
                        <input type="text" value={nama} onChange={(e) => setNama(e.target.value)}
                            placeholder="Masukkan nama" style={s.input} />
                    </div>
                    <div style={s.group}>
                        <label style={s.label}>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            placeholder="nama@email.com" style={s.input} />
                    </div>
                    <div style={s.group}>
                        <label style={s.label}>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            placeholder="Minimal 6 karakter" style={s.input} />
                    </div>
                    <button type="submit" disabled={loading}
                        style={{ ...s.btn, ...(loading ? { opacity: 0.5 } : {}) }}>
                        {loading ? "Memproses..." : "Daftar"}
                    </button>
                </form>
                <p style={s.switchText}>
                    Sudah punya akun? <Link to="/login" style={s.switchLink}>Masuk</Link>
                </p>
            </div>
        </div>
    );
}

const s = {
    page: {
        minHeight: "100vh", background: "#f9fafb",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 16px",
    },
    card: {
        maxWidth: "380px", width: "100%", background: "#fff",
        borderRadius: "12px", border: "1px solid #eee",
        padding: "36px 28px", textAlign: "center",
    },
    title: { fontSize: "22px", fontWeight: "700", color: "#111", marginBottom: "4px" },
    subtitle: { fontSize: "14px", color: "#999", marginBottom: "24px" },
    form: { display: "flex", flexDirection: "column", gap: "14px", textAlign: "left" },
    group: { display: "flex", flexDirection: "column", gap: "5px" },
    label: { color: "#555", fontSize: "13px", fontWeight: "500" },
    input: {
        padding: "10px 12px", borderRadius: "8px", border: "1px solid #e5e7eb",
        background: "#fff", color: "#111", fontSize: "14px", outline: "none", fontFamily: "inherit",
    },
    btn: {
        padding: "11px", border: "none", borderRadius: "8px",
        background: "#16a34a", color: "#fff", fontSize: "14px",
        fontWeight: "600", cursor: "pointer", marginTop: "4px",
    },
    error: {
        color: "#dc2626", fontSize: "13px", textAlign: "center",
        padding: "8px", background: "#fef2f2", borderRadius: "8px", border: "1px solid #fecaca",
    },
    switchText: { color: "#888", fontSize: "13px", marginTop: "20px" },
    switchLink: { color: "#16a34a", fontWeight: "600", textDecoration: "none" },
};

export default RegisterPage;
