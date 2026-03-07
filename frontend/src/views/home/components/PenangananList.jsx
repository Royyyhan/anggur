import styles from "../../../styles/appStyles";

function PenangananList({ penanganan }) {
    if (!penanganan || penanganan.length === 0) return null;

    return (
        <div style={styles.penangananSection}>
            <h3 style={styles.penangananTitle}>💊 Rekomendasi Penanganan</h3>
            {penanganan.map((item, index) => (
                <div key={index} style={styles.penangananCard}>
                    <div style={styles.penangananNumber}>{index + 1}</div>
                    <div style={styles.penangananContent}>
                        <p style={styles.penangananJudul}>{item.judul_penanganan}</p>
                        <p style={styles.penangananDesc}>{item.deskripsi_penanganan}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PenangananList;
