import styles from "../../../styles/appStyles";

function ModeTabs({ mode, onSwitchMode }) {
    return (
        <div style={styles.tabs}>
            <button
                onClick={() => onSwitchMode("upload")}
                style={{
                    ...styles.tab,
                    ...(mode === "upload" ? styles.tabActive : {}),
                }}
            >
                📁 Upload File
            </button>
            <button
                onClick={() => onSwitchMode("camera")}
                style={{
                    ...styles.tab,
                    ...(mode === "camera" ? styles.tabActive : {}),
                }}
            >
                📷 Ambil Foto
            </button>
        </div>
    );
}

export default ModeTabs;
