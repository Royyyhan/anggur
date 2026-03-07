const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Akses ditolak. Hanya admin yang dapat mengakses.",
            currentRole: req.user?.role || "tidak ada role (login ulang diperlukan)",
        });
    }
    next();
};

module.exports = { isAdmin };
