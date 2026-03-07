import styles from "../../../styles/appStyles";

function ImagePreview({ preview }) {
    if (!preview) return null;

    return (
        <div style={styles.previewContainer}>
            <p style={styles.previewLabel}>Preview Gambar</p>
            <img src={preview} alt="Preview" style={styles.previewImg} />
        </div>
    );
}

export default ImagePreview;
