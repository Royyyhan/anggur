import PenangananList from "./PenangananList";
import styles from "../../../styles/appStyles";

function DetectionResult({ result, onReset }) {
    if (!result) return null;

    const confidenceColor =
        result.confidence > 0.8
            ? "#22c55e"
            : result.confidence > 0.5
                ? "#f59e0b"
                : "#ef4444";

    return (
        <div style={styles.resultContainer}>
            <div style={styles.resultHeader}>
                <h2 style={styles.resultTitle}>📋 Hasil Analisis</h2>
            </div>

            <div style={styles.resultCards}>
                <div style={styles.resultCard}>
                    <span style={styles.cardIcon}>🦠</span>
                    <span style={styles.cardLabel}>Penyakit</span>
                    <span style={styles.cardValue}>{result.penyakit}</span>
                </div>
                <div style={styles.resultCard}>
                    <span style={styles.cardIcon}>📊</span>
                    <span style={styles.cardLabel}>Tingkat Keyakinan</span>
                    <span style={styles.cardValue}>
                        {(result.confidence * 100).toFixed(1)}%
                    </span>
                    <div style={styles.progressBar}>
                        <div
                            style={{
                                ...styles.progressFill,
                                width: `${(result.confidence * 100).toFixed(1)}%`,
                                backgroundColor: confidenceColor,
                            }}
                        />
                    </div>
                </div>
            </div>

            <PenangananList penanganan={result.penanganan} />

            <button onClick={onReset} style={styles.resetBtn}>
                🔄 Deteksi Lagi
            </button>
        </div>
    );
}

export default DetectionResult;
