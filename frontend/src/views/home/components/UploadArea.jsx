import styles from "../../../styles/appStyles";

function UploadArea({ onFileChange }) {
    return (
        <div style={styles.uploadArea}>
            <label style={styles.uploadLabel}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    style={{ display: "none" }}
                />
                <div style={styles.uploadBox}>
                    <span style={styles.uploadIcon}>☁️</span>
                    <span style={styles.uploadText}>Klik untuk pilih gambar daun</span>
                    <span style={styles.uploadHint}>JPG, JPEG, PNG (max 5MB)</span>
                </div>
            </label>
        </div>
    );
}

export default UploadArea;
