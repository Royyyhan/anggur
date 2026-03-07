import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Pilih gambar terlebih dahulu");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/deteksi/predict",
        formData
      );

      setResult(response.data.data);
    } catch (error) {
      console.error(error);
      alert("Gagal melakukan deteksi");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px", fontFamily: "Arial" }}>
      <h1>Deteksi Penyakit Tanaman</h1>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      <br /><br />

      <button onClick={handleSubmit}>Deteksi</button>

      {preview && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={preview}
            alt="Preview"
            width="250"
            style={{ borderRadius: "10px" }}
          />
        </div>
      )}

      {result && (
        <div style={{ marginTop: "30px" }}>
          <h2>Hasil Deteksi</h2>
          <p><b>Penyakit:</b> {result.penyakit}</p>
          <p><b>Confidence:</b> {(result.confidence * 100).toFixed(2)}%</p>
          <p><b>ID Deteksi:</b> {result.id_deteksi}</p>
        </div>
      )}
    </div>
  );
}

export default App;