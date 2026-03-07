import styles from "../../../styles/appStyles";

function Header() {
    return (
        <div style={styles.header}>
            <div style={styles.logoIcon}>🌿</div>
            <h1 style={styles.title}>PlantDoc AI</h1>
            <p style={styles.subtitle}>
                Deteksi penyakit tanaman menggunakan kecerdasan buatan
            </p>
        </div>
    );
}

export default Header;
