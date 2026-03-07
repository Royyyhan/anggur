const { getAllPenyakit, getPenyakitById } = require("../models/penyakitModel");

const index = async (req, res) => {
  try {
    const data = await getAllPenyakit();

    res.status(200).json({
      success: true,
      message: "Data penyakit berhasil diambil",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data penyakit",
      error: error.message,
    });
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getPenyakitById(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Penyakit tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Detail penyakit berhasil diambil",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil detail penyakit",
      error: error.message,
    });
  }
};

module.exports = {
  index,
  show,
};