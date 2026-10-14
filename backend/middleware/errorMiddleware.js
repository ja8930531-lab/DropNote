const errorHandler = (err, req, res, next) => {
  console.error("Server error:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error.",
  });
};

module.exports = errorHandler;