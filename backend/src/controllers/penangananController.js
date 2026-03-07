const { getPenangananByPenyakitId } = require("../models/penangananModel");

const showByPenyakit = async (req, res) => {
  try {
    const { id_penyakit } = req.params;
    const data = await getPenangananByPenyakitId(id_penyakit);

    res.status(200).json({
      success: true,
      message: "Data penanganan berhasil diambil",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data penanganan",
      error: error.message,
    });
  }
};

module.exports = {
  showByPenyakit,
};