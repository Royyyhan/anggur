function RiwayatCard({ item }) {
    return (
        <div style={c.card}>
            <img
                src={`http://localhost:5000/uploads/${item.gambar_upload}`}
                alt="Hasil deteksi"
                style={c.img}
            />
            <div style={c.info}>
                <h4 style={c.penyakit}>{item.nama_penyakit}</h4>
                <div style={c.meta}>
                    <span style={c.confidence}>
                        {(item.tingkat_keyakinan * 100).toFixed(1)}% akurasi
                    </span>
                    <span style={c.dot}>·</span>
                    <span style={c.tanggal}>
                        {new Date(item.tanggal_deteksi).toLocaleDateString("id-ID", {
                            day: "numeric", month: "short", year: "numeric",
                        })}
                    </span>
                </div>
            </div>
        </div>
    );
}

const c = {
    card: {
        display: "flex",
        gap: "16px",
        alignItems: "center",
        background: "#fff",
        border: "1px solid #f3f4f6",
        borderRadius: "14px",
        padding: "14px",
        transition: "box-shadow 0.2s",
    },
    img: {
        width: "72px", height: "72px",
        objectFit: "cover", borderRadius: "10px",
        border: "1px solid #e5e7eb", flexShrink: 0,
    },
    info: { flex: 1 },
    penyakit: {
        fontSize: "15px", fontWeight: "700",
        color: "#111827", margin: "0 0 6px",
    },
    meta: {
        display: "flex", alignItems: "center", gap: "6px",
        fontSize: "13px", color: "#6b7280",
    },
    confidence: { color: "#16a34a", fontWeight: "600" },
    dot: { color: "#d1d5db" },
    tanggal: {},
};

export default RiwayatCard;
