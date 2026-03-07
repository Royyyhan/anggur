import { useRef, useCallback, useState, useEffect } from "react";
import styles from "../../../styles/appStyles";

function CameraCapture({ onCapture }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);
    const [cameraReady, setCameraReady] = useState(false);

    const startCamera = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment", width: 640, height: 480 },
            });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setCameraReady(true);
        } catch (err) {
            alert("Tidak dapat mengakses kamera. Pastikan izin kamera diberikan.");
            console.error(err);
        }
    }, []);

    const stopCamera = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
        setCameraReady(false);
    }, []);

    const capturePhoto = useCallback(() => {
        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0);

        canvas.toBlob(
            (blob) => {
                const capturedFile = new File([blob], "captured.jpg", {
                    type: "image/jpeg",
                });
                stopCamera();
                onCapture(capturedFile, URL.createObjectURL(blob));
            },
            "image/jpeg",
            0.9
        );
    }, [stopCamera, onCapture]);

    useEffect(() => {
        startCamera();
        return () => stopCamera();
    }, [startCamera, stopCamera]);

    return (
        <div style={styles.cameraArea}>
            {cameraReady && (
                <>
                    <video ref={videoRef} autoPlay playsInline style={styles.video} />
                    <button onClick={capturePhoto} style={styles.captureBtn}>
                        <span style={styles.captureBtnInner} />
                    </button>
                </>
            )}
            {!cameraReady && (
                <div style={styles.cameraPlaceholder}>
                    <span style={{ fontSize: "48px" }}>📷</span>
                    <p>Kamera sedang dimuat...</p>
                </div>
            )}
            <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
    );
}

export default CameraCapture;
